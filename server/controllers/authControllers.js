const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = generateToken(user);

  res.status(200).json({
    token,
    user: {
      id: user._id,
      name: user.firstName + " " + user.lastName,
      email: user.email,
    },
  });
};
