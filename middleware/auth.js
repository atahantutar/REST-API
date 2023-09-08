const jwt = require("jsonwebtoken");
const Auth = require("../models/auth.js");

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        succeeded: false,
        error: "No token available",
      });
    }

    req.userId = await Auth.findById(
      jwt.verify(token, process.env.SECRET_TOKEN).id._id
    );

    next();
  } catch (error) {
    res.status(401).json({ succeeded: false, error: "Not Authorized" });
  }
};

module.exports = auth;
