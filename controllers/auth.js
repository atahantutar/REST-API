const Auth = require("../models/auth.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const user = await Auth.findOne({ email });
    if (user) {
      return res.status(500).json({ message: "There is such an e-mail." });
    }
    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "Your password must not be less than 6 characters." });
    }
    const passwordHash = await bcrypt.hash(password, 12);

    const newUser = await Auth.create({
      username,
      email,
      password: passwordHash,
    });

    const userToken = jwt.sign({ id: newUser._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.header("Authorization", userToken).json({ accessToken: userToken });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "There is no such user" });
    }
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) {
      return res
        .status(500)
        .json({ message: "Your password or email address is incorrect." });
    }
    const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });
    res.header("Authorization", token).json({ accessToken: token });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
