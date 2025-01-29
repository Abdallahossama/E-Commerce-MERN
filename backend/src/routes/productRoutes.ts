import express from "express";
import { getAllProducts } from "../services/productService";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  try {
    const { data, status } = await getAllProducts();
    res.status(status).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching products", error });
  }
});

export default productsRouter;
