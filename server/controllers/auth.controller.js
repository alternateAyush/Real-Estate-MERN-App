import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.util.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const signup = async (req, res, next) => {
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

export const signin = async (req, res, next) => {
  try {
    const { cred, password } = req.body;
    const validUser =
      (await User.findOne({ email: cred })) 
      ||(await User.findOne({ username: cred }));
    console.log(validUser);
    if (!validUser) {
      return next(errorHandler(404, "User not found."));
    }
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(401, "Wrong credentials."));
    }
    const token = jwt.sign({id:validUser._id},process.env.JWT_SECRET);
    const {password:pass,createdAt,...user} = validUser._doc;
    res.cookie('access_token',token,{httpOnly:true}).status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
