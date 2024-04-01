const express = require("express");
const {
getDoctorListController,
getUserListController,
getChangeDoctorStatus

}= require("../controllers/adminCtrls");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/getdoctors',authMiddleware,getDoctorListController,()=>{})
router.post('/getusers',authMiddleware,getUserListController,()=>{})
router.post('/doctor-change-status',authMiddleware,getChangeDoctorStatus,()=>{})


module.exports = router;