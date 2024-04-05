import express, { Request, Response } from "express";
import { User } from "../models/user";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { check, validationResult } from "express-validator";

const router = express.Router();

//api/users/register
router.post(
  "/register",
  [
    check("firstName", "First Name is required").isString(),
    check("lastName", "Last Name is required").isString(),
    check("email", "Email is required").isEmail(),
    check("password", "Password of minimum 6 characters is required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }
    try {
      let user = await User.findOne({
        email: req.body.email,
      });

      if (user) {
        return res.status(400).json({ message: "user already exists" });
      }

      user = new User(req.body);

      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        {
          expiresIn: "1d",
        }
      );

      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
      });

      return res.status(200).json({ message: "User created succesfully", body: user });
    } catch (error) {
      console.log(error);

      return res.status(500).json("Something Went Wrong");
    }
  }
);

export default router;
