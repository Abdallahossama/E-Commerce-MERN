import cartModel from "../models/cartModel";

interface createCartForUser {
  userId: string;
}

export const getcart = async ({ userId }:createCartForUser) => {
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
