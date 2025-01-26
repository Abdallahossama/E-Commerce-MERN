import cartModel from "../models/cartModel";
import productModule from "../models/productModel";

interface createCartForUser {
  userId: string;
}

export const getcart = async ({ userId }: createCartForUser) => {
  const cart = await cartModel.findOne({ userId, status: "active" });
  if (!cart) {
    const newCart = new cartModel({
      userId,
      status: "active",
      totalPrice: 0,
      items: [],
    });
    newCart.save();
    return newCart;
  }
  return cart;
};

interface cartItem {
  userId: string;
  productId: any;
  quantity: string;
}
export const addItemToCart = async ({
  userId,
  productId,
  quantity,
}: cartItem) => {
  const cart = await getcart({ userId });

  const existsInCart = cart.items.find((p) => {
    return p.product.toString() === productId    
  });
  if (existsInCart) {
    return { data: "item already in cart", statusCode: 400 };
  }
  const product = await productModule.findById(productId);
  if (!product) return { data: "Product not found!", status: 400 };
  if (product.stock < parseInt(quantity)){
    return { data: `Only ${product.stock}  items available`, statusCode: 400 };
  }
    cart.items.push({
      product: productId,
      unitPrice: product.price,
      quantity: parseInt(quantity),
    });
  cart.totalPrice += parseInt(quantity) * product.price;
  product.stock -= parseInt(quantity);
  await product.save()
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 201 };
};

// export const productExists = ({ userId, productId, quantity }:) => {
  
// };