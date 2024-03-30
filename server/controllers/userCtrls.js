const userModel = require("../models/useModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(500).send({
        message: "User Not Found",
        success: false,
      });
    }
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        message: "Invalid password or Email",
        success: false,
      });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(200).send({
      message: "login success",
      success: true,
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `Eroor in login CTRL ${error.message}`,
    });
  }
};

const registerController = async (req, res) => {
  try {
    const existingUser = await userModel.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(200).send({
        message: "user already exist",
        success: false,
      });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    req.body.password = hashedpassword;
    const newUser = new userModel(req.body);
    await newUser.save();
    res.status(201).send({
      message: "registered successfull",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: `regiseration controller ${error.message}`,
    });
  }
};

const authController = async(req,res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.password=undefined;
    //console.log("userctrl"+user);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "auth error",
      error
    });
  }
};

module.exports = { loginController, registerController, authController };
