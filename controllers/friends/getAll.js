const { Friends } = require("../../models/friends");

const getAll = async (req, res) => {
  const result = await Friends.find({});

  res.json(result);
};

module.exports = getAll;
