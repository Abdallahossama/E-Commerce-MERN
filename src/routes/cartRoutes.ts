import express, { Request, Response } from "express";
import { addItemToCart, getcart } from "../services/cartServices";
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
  const {data,statusCode} = await addItemToCart({ userId, productId, quantity });
  res.status(statusCode!).send(data);
});

export default cartRouter;
