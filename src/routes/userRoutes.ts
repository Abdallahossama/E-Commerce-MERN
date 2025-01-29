import express from "express";
import { logIn, register } from "../services/userService";

const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const { data, status } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(status).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
});

userRoutes.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const { data, status } = await logIn({ email, password });
    res.status(status).send(data);
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

export default userRoutes;
