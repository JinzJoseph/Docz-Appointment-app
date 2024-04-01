const express = require("express");
const {
  loginController,
  registerController,
  authController,
  applyDoctorController,
  getAllNotificationController,
  deleteAllNotificationController,
  getDoctorList
} = require("../controllers/userCtrls");
const authMiddleware = require("../middlewares/authMiddleware");


//router object
const router = express.Router();

//route
//Login || post
router.post("/login", loginController, () => {});
router.post('/register', registerController, () => {});
router.post('/getUserData',authMiddleware,authController,()=>{})
router.post('/apply-doctor',authMiddleware,applyDoctorController,()=>{})
router.post('/get-notification',authMiddleware,getAllNotificationController,()=>{})
router.post('/delete-notification',authMiddleware,deleteAllNotificationController,()=>{})
router.get('/doctorList',authMiddleware,getDoctorList,()=>{})
module.exports = router;
