const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = await User.findOne({ email });
  if (newUser) {
    throw RequestError(409, "Email in use");
  }
  const hashPassword = await bcrypt.hash(password, 6);
  const avatarURL = gravatar.url(email);

  const result = await User.create({
    name,
    email,
    password: hashPassword,
    avatarURL,
  });
  res.status(200).json({ message: "account created successfully", email: result.email, name: result.name });
};

module.exports = register;
