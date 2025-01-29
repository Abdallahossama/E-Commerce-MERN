import express from "express";
import userRoutes from "./userRoutes";
import productsRouter from "./productRoutes";
import { seedInitialProducts } from "../services/productService";
import cartRouter from "./cartRoutes";

const routes = express.Router();

seedInitialProducts();
routes.use("/products", productsRouter);
routes.use("/user", userRoutes);
routes.use("/cart", cartRouter);

export default routes;
