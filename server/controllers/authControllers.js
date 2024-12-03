import userModel from "../models/userModel.js";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "user already exist",
      });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "please enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: "please enter a strong password",
      });
    }
   //hasing user password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save(); //save in db

    const token = createToken(user._id);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message: "User Does not exist ",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
        const token = createToken(user._id)
        res.json({ success: true, token });
    }else{
        res.json({
            message: "Invalid credentials",
            success: false,
          });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

export { registerUser, loginUser}
