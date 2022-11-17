const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const getCurrentUser = async (req, res) => {
  const { _id } = req.user;

  const data = await User.find({ _id }).populate({
    path: "pets",
  });

  if (!data) {
    throw RequestError(404, "User not found");
  }

  res.json({ data });
};

module.exports = getCurrentUser;
