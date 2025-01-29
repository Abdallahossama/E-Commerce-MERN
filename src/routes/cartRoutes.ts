import express, { Request } from "express";
import {
  addItemToCart,
  clearCart,
  deleteItemFromCart,
  getcart,
  orderCheckout,
  updateItemInCart,
} from "../services/cartServices";
import validateJWT from "../middlewares/validateJWT";

const cartRouter = express.Router();
interface userRequest extends Request {
  user?: any;
}

cartRouter.get("/", validateJWT, async (req: userRequest, res) => {
  try {
    const userId = req.user._id;
    const cart = await getcart({ userId });
    res.status(200).send(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
});

cartRouter.post("/items", validateJWT, async (req: userRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await addItemToCart({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode!).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error });
  }
});

cartRouter.put("/items", validateJWT, async (req: userRequest, res) => {
  try {
    const userId = req.user._id;
    const { productId, quantity } = req.body;
    const { data, statusCode } = await updateItemInCart({
      userId,
      productId,
      quantity,
    });
    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error updating item in cart", error });
  }
});

cartRouter.delete(
  "/items/:productId",
  validateJWT,
  async (req: userRequest, res) => {
    try {
      const userId = req.user._id;
      const { productId } = req.params;
      const { data, statusCode } = await deleteItemFromCart({
        userId,
        productId,
      });
      res.status(statusCode).send(data);
    } catch (error) {
      res.status(500).json({ message: "Error deleting item from cart", error });
    }
  }
);

cartRouter.delete("/items/", validateJWT, async (req: userRequest, res) => {
  try {
    const userId = req.user._id;
    const { data, statusCode } = await clearCart({ userId });
    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error });
  }
});

cartRouter.post("/checkout", validateJWT, async (req: userRequest, res) => {
  try {
    const userId = req.user._id;
    const address = req.body.address;
    const { data, statusCode } = await orderCheckout({ userId, address });
    res.status(statusCode).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error processing checkout", error });
  }
});

export default cartRouter;
