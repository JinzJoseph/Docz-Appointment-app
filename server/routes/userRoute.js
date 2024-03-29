const express = require("express");
const {
  loginController,
  registerController,
  authController
} = require("../controllers/userCtrls");
const authMiddleware = require("../middlewares/authMiddleware");

//router object
const router = express.Router();

//route
//Login || post
router.post("/login", loginController, () => {});
router.post('/register', registerController, () => {});
router.post('/getUserData',authMiddleware,authController,()=>{})

module.exports = router;
