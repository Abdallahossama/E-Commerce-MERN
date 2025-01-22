import express from "express";
import { logIn, register } from "../services/userService";
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const { data, status } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  res.status(status).send(data);
});
userRoutes.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const { data, status } = await logIn({ email, password });
  res.status(status).send(data);
});

export default userRoutes;
