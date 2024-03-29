const express = require("express");
const {
  loginController,
  registerController,
} = require("../controllers/userCtrls");

//router object
const router = express.Router();

//route
//Login || post
router.post("/login", loginController, () => {});
router.post('/register', registerController, () => {});

module.exports = router;
