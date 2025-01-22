import express from "express";
import userRoutes from "./userRoutes";

const routes = express.Router();

routes.use("/user", userRoutes);

export default routes;
