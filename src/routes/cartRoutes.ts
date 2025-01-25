import express, { Request } from "express";
import { getcart } from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";
const cartRouter = express.Router();
interface userRequest extends Request{
  user?:any
}

cartRouter.get("/", validateJWT, async (req: userRequest, res) => {
  const userId = req.user._id;
  const cart = await getcart({ userId });
  res.status(200).send(cart);
});

export default cartRouter;
