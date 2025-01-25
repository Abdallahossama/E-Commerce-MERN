import express from "express";
import { getAllProducts } from "../services/productService";

const productsRouter = express.Router();

productsRouter.get("/", async (req, res) => {
  const { data, status } = await getAllProducts();
  res.status(status).send(data);
});

export default productsRouter;