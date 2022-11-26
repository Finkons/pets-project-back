const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { createToken } = require("../../helpers");

const register = async (req, res) => {
  const { email, password: regPassword, name, location, phone } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(regPassword, 6);
  const avatarURL = gravatar.url(email);

  const user = await User.create({
    email: email.toLowerCase(),
    password: hashPassword,
    name,
    location,
    phone,
    avatarURL,
  });
  const token = createToken(user._id);
  await User.findByIdAndUpdate(user._id, { token });
  res.status(200).json({
    token,
    user,
  });
};
module.exports = register;
