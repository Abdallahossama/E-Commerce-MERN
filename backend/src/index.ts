import dontenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import routes from "./routes/routes";
import cors from "cors";

dontenv.config();
const app = express();
const port = 2000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.DATABASE_URL || "")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use(routes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
