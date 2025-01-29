import cartModel from "../models/cartModel";
import orderModel, { IorderItem } from "../models/orderModel";
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
    return p.product.toString() === productId;
  });
  if (existsInCart) {
    return { data: "item already in cart", statusCode: 400 };
  }
  const product = await productModule.findById(productId);
  if (!product) return { data: "Product not found!", status: 400 };
  if (product.stock < parseInt(quantity)) {
    return { data: `Only ${product.stock}  items available`, statusCode: 400 };
  }
  cart.items.push({
    product: productId,
    unitPrice: product.price,
    quantity: parseInt(quantity),
  });
  cart.totalPrice += parseInt(quantity) * product.price;
  const updatedCart = await cart.save();
  return { data: updatedCart, statusCode: 201 };
};
interface cartUpdate {
  userId: string;
  productId: any;
  quantity: string;
}
export const updateItemInCart = async ({
  userId,
  productId,
  quantity,
}: cartUpdate) => {
  const cart = await getcart({ userId });

  const existsInCart = cart.items.find((p) => {
    return p.product.toString() === productId;
  });
  if (!existsInCart) {
    return { data: "item is not in the cart cart", statusCode: 400 };
  }

  const product = await productModule.findById(productId);
  if (product!.stock < parseInt(quantity)) {
    return {
      data: `Only ${product!.stock}  items available`,
      statusCode: 400,
    };
  }
  existsInCart.quantity = parseInt(quantity);
  const restItemsInTheCart = cart.items.filter((p) => {
    return p.product.toString() != productId;
  });

  let total = restItemsInTheCart.reduce((sum, product) => {
    return (sum += product.quantity * product.unitPrice);
  }, 0);

  total += existsInCart.unitPrice * existsInCart.quantity;

  cart.totalPrice = total;

  const newCart = await cart.save();
  return {
    data: newCart,
    statusCode: 200,
  };
};
interface deleteItem {
  userId: string;
  productId: any;
}
export const deleteItemFromCart = async ({ userId, productId }: deleteItem) => {
  const cart = await getcart({ userId });

  const existsInCart = cart.items.find((p) => {
    return p.product.toString() === productId;
  });

  if (!existsInCart) {
    return { data: "item is not in the cart cart", statusCode: 400 };
  }

  const restItemsInTheCart = cart.items.filter((p) => {
    return p.product.toString() != productId;
  });

  let total = restItemsInTheCart.reduce((sum, product) => {
    return (sum += product.quantity * product.unitPrice);
  }, 0);

  cart.items = restItemsInTheCart;
  cart.totalPrice = total;

  const newCart = await cart.save();
  return {
    data: newCart,
    statusCode: 200,
  };
};
interface deleteAllItems {
  userId: string;
}
export const clearCart = async ({ userId }: deleteAllItems) => {
  const cart = await getcart({ userId });
  cart.items = [];
  cart.totalPrice = 0;

  const newCart = await cart.save();
  return {
    data: newCart,
    statusCode: 200,
  };
};
interface orderCheckout {
  userId: string;
  address: string;
}
export const orderCheckout = async ({ userId, address }: orderCheckout) => {
  const cart = await getcart({ userId });
  if (cart.items.length === 0) {
    return {
      data: "no items in the cart",
      statusCode: 400,
    };
  }
  const orderItems: IorderItem[] = [];

  for (const cartItem of cart.items) {
    let product = await productModule.findById(cartItem.product);
    if (!product) {
      return {
        data: "product not found!",
        statusCode: 400,
      };
    }
    orderItems.push({
      productTitle: product?.title,
      productImage: product?.image,
      unitPrice: product?.price,
      quantity: cartItem.quantity,
    });
  }

  const newOrder = await new orderModel({
    orderItems: orderItems,
    totalPrice: cart.totalPrice,
    address,
  });
  if (!newOrder) {
    return {
      data: "somthing went wrong while creating order!",
      statusCode: 400,
    };
  }

  const orderDone = await newOrder.save();
  if (!orderDone) {
    return {
      data: "somthing went wrong while saving the order",
      statusCode: 400,
    };
  }
  for (const cartItem of cart.items) {
    let product = await productModule.findById(cartItem.product);
    product!.stock -= cartItem.quantity;
    await product!.save();
  }
  cart.status = "completed";
  await cart!.save();
  return {
    data: orderDone,
    statusCode: 200,
  };
};
