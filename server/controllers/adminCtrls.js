const userModel = require("../models/useModel");
const doctorModel = require("../models/doctorModel");

const getDoctorListController = async (req,res) => {
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
const getUserListController = async(req,res) => {

    try {
        const users=await userModel.find({})
        res.status(200).send({
            success:true,
            message:"User List",
            data:users
        })
        
    } catch (error) {
        console.log(error);
    res.status(500).send({
      success: false,
      message: "failed to get UserList",
    }); 
    }

};

module.exports = { getDoctorListController, getUserListController };
