import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.util.js";

export const signup = async (req, res,next) => {
  try {
    const { username, email, password } = req.body;
    const salt = bcryptjs.genSaltSync(12);
    const hashedPassword = bcryptjs.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
    // console.log(error);
    // next(errorHandler(400,"Duplicate username and email"));
    // res.status(400).json({ success: false, message: error });
  }
  return;
};
