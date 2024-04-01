const express = require("express");

const {
  getDoctorInfoController,
  getDoctorUpdateContoller,
  getDoctorByIdController,
} = require("../controllers/doctorCtrls");

const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/getDoctorinfo",
  authMiddleware,
  getDoctorInfoController,
  () => {}
);
router.post(
  "/updateProfile",
  authMiddleware,
  getDoctorUpdateContoller,
  () => {}
);
router.post(
  "/getDoctorById",
  authMiddleware,
  getDoctorByIdController,
  () => {}
);
module.exports = router;
