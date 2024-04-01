const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // console.log("reg"+ req.headers.Accept-Encoding);
    const token = req.headers["authorization"].split(" ")[1];

    // console.log("token ");
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(200).send({
          message: "Auth Failed !!!!",
          success: false,
        });
      } else {
        req.body.userId = decode.id;
        console.log();(req.body.userId)
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(401).send({
      message: " 2Auth Failed",
      success: false,
    });
  }
};
