import express, { Request, Response } from "express";
import {
  addItemToCart,
  clearCart,
  deleteItemFromCart,
  getcart,
  updateItemInCart,
} from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";
const cartRouter = express.Router();
interface userRequest extends Request {
  user?: any;
}

cartRouter.get("/", validateJWT, async (req: userRequest, res) => {
  const userId = req.user._id;
  const cart = await getcart({ userId });
  res.status(200).send(cart);
});

cartRouter.post("/items", validateJWT, async (req: userRequest, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const { data, statusCode } = await addItemToCart({
    userId,
    productId,
    quantity,
  });
  res.status(statusCode!).send(data);
});

cartRouter.put("/items", validateJWT, async (req: userRequest, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const { data, statusCode } = await updateItemInCart({
    userId,
    productId,
    quantity,
  });
  res.status(statusCode).send(data);
});

cartRouter.delete(
  "/items/:productId",
  validateJWT,
  async (req: userRequest, res) => {
    const userId = req.user._id;
    const { productId } = req.params;
    const { data, statusCode } = await deleteItemFromCart({
      userId,
      productId,
    });
    res.status(statusCode).send(data);
  }
);
cartRouter.delete(
  "/items/",
  validateJWT,
  async (req: userRequest, res) => {
    const userId = req.user._id;
    const { data, statusCode } = await clearCart({
      userId,
    });
    res.status(statusCode).send(data);
  }
);

export default cartRouter;
