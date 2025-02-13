import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel";

interface userRequest extends Request {
  user?: any;
}

const validateJWT = (req: userRequest, res: Response, next: NextFunction) => {
  const authorizationHeader = req.get("authorization");

  if (!authorizationHeader) {
    res.status(403).send("Authorization header was not provided");
    return;
  }

  const token = authorizationHeader.split(" ")[1];

  if (!token) {
    res.status(403).send("Bearer token not found");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET||'', async (err:any, payload:any) => {
    if (err) {
      return res.status(403).send("Invalid token");
    }
    if (!payload) {
      return res.status(403).send("Invalid Token Payload");
    }
    const userPayload = payload as {
      email: string;
      firstName: string;
      lastName: string;
    };

    const user = await userModel.findOne({ email: userPayload.email });

    req.user = user?._id;
    next();
  });
};

export default validateJWT;
