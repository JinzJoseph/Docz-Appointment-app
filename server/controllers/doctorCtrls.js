const userModel = require("../models/useModel");
const doctorModel = require("../models/doctorModel");

const getDoctorInfoController = async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({
      success: true,
      message: "doctor data fetch success",
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get doctor info",
      error,
    });
  }
};
const getDoctorUpdateContoller = async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate(
      { userId: req.body.userId },
      req.body
    );
    res.status(200).send({
      message: "succesfully updated doctor profile",
      success: true,
      data: doctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Failed to update doctor profile",
      error,
    });
  }
};
const getDoctorByIdController = async (req, res) => {
  try {
    console.log(req.body.doctorId); // Log the doctorId received from the frontend
    const singleDoctor = await doctorModel.findOne({
      _id: req.body.doctorId // Change req.body.id to req.body.doctorId
    });
    res.status(200).send({
      success: true,
      message: "Single Doc Info Fetched",
      data: singleDoctor,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      error,
      message: "Error in Single doctor info",
    });
  }
};
module.exports = {
  getDoctorInfoController,
  getDoctorUpdateContoller,
  getDoctorByIdController,
};
