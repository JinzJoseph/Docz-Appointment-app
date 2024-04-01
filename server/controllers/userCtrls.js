const userModel = require("../models/useModel");
const doctorModel = require("../models/doctorModel");
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

const authController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    //user.password =null;
    //console.log("userctrl"+user);
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "auth error",
      error,
    });
  }
};
const applyDoctorController = async (req, res) => {
  try {
    if (!req.body.phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required sadssd.",
      });
    }
    const newDoctor = await doctorModel({ ...req.body, status: "pending" });
    await newDoctor.save();
    const adminUser = await userModel.findOne({ isAdmin: true });
    const notification = adminUser.notification;
    notification.push({
      type: "apply-doctor-request",
      message: `${newDoctor.firstName} ${newDoctor.lastName} has applied for Doctor account`,
      date: {
        doctorId: newDoctor._id,
        name: newDoctor.firstName + " " + newDoctor.lastName,
        onClickPath: "/admin/doctors",
      },
    });
    await userModel.findByIdAndUpdate(adminUser._id, { notification });
    res.status(201).send({
      success: true,
      message: "doctor account applied successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error While Applying For Doctor",
    });
  }
};
const getAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    const seennotification = user.seennotification;
    const notification = user.notification;
    seennotification.push(...notification);
    user.notification = [];
    user.seennotification = notification;
    const updatedUser = await user.save();
    res.status(200).send({
      success: true,
      message: "all notification marked as read",
      data: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while get notification",
    });
  }
};
const deleteAllNotificationController = async (req, res) => {
  try {
    const user = await userModel.findOne({ _id: req.body.userId });
    user.notification = [];
    user.seennotification = [];
    const updatedUser = await user.save();
    updatedUser.password = undefined;
    res.status(200).send({
      success: true,
      message: "all notification deleted",
      date: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "error while get deleting notification",
    });
  }
};
const getDoctorList = async (req, res) => {
  try {
    const doctor = await doctorModel.find({ status:"approved" });
    res.status(200).send({
      message: "succesfully fetched Doctor List",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "failed to fetch doctor list",
      success: false,
      error,
    });
  }
};

module.exports = {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getDoctorList,
};
