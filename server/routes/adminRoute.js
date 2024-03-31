const express = require("express");
const {
getDoctorListController,
getUserListController

}= require("../controllers/adminCtrls");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();


router.post('/getdoctors',authMiddleware,getDoctorListController,()=>{})
router.post('/getusers',authMiddleware,getUserListController,()=>{})


module.exports = router;