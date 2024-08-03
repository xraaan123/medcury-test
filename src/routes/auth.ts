import express, { Request, Response } from "express";
import { User, users } from "../models/User";
import jwt from "jsonwebtoken";

const router = express.Router();
const SECRET_KEY =
  process.env.SECRET_KEY ||
  "fa184a8dcd5269fdbf1f91ed69299c9d0fe2f42d567311845be4402acfaf3c21";

// @route   POST /register
// @desc    Register a new user
router.post("/register", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = users.find((user) => user.username === username);

  if (existingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  const newUser: User = {
    id: users.length + 1,
    username,
    password,
  };

  users.push(newUser);
  console.log("after push:", users);
  res.json({ msg: "User registered successfully" });
});

// @route POST /login
// @desc  Authenticate user and get token
router.post("/login", (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
    expiresIn: "1h",
  });

  user.token = token;

  res.json({ token });
});

export default router;
