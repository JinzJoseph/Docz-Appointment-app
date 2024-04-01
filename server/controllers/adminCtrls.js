const userModel = require("../models/useModel");
const doctorModel = require("../models/doctorModel");

const getDoctorListController = async (req, res) => {
  try {
    const doctors = await doctorModel.find({});
    res.status(200).send({
      success: true,
      message: "Doctor List",
      data: doctors,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get DoctorList",
    });
  }
};
const getUserListController = async (req, res) => {
  try {
    const users = await userModel.find({});
    res.status(200).send({
      success: true,
      message: "User List",
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get UserList",
    });
  }
};
const getChangeDoctorStatus = async (req, res) => {
  try {
    const { doctorId, status } = req.body;
    const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
    const user = await userModel.findOne({ _id: doctor.userId });
    const notification = user.notification;
    notification.push({
      type: "doctor-account approved",
      message: `your doctor account has ${status}`,
      onClickpath: "/notifcation",
    });
    user.isDoctor === "approved" ? true : false;
    await user.save();
    res.status(200).send({
      success: true,
      message: "successfully account approved",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({
      success: false,
      message: "failed to change doctor approval",
    });
  }
};

module.exports = {
  getDoctorListController,
  getUserListController,
  getChangeDoctorStatus,
};
