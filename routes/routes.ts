import express from "express";
import userRoutes from "./userRoutes";
import productsRouter from "./productRoutes";
import {seedInitialProducts} from '../services/productService'

const routes = express.Router();

seedInitialProducts()
routes.use("/products", productsRouter);
routes.use("/user", userRoutes);

export default routes;
