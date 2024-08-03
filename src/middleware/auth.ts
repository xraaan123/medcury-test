import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, users } from "../models/User";

const SECRET_KEY =
  process.env.SECRET_KEY ||
  "fa184a8dcd5269fdbf1f91ed69299c9d0fe2f42d567311845be4402acfaf3c21";

export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("x-auth-token");

  if (!token) {
    console.log("No token provided");
    return res.status(401).json({ msg: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as User;
    console.log("Decoded token:", decoded.id);
    const user = users.find((u) => u.id === decoded.id);
    console.log("users:", users);
    console.log("user", user);

    if (!user) {
      console.log("User not found");
      return res.status(401).json({ msg: "Token is not valid" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Token verification failed:", error);
    res.status(401).json({ msg: "Token is not valid" });
  }
};
