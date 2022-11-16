const { Sponsors } = require("../../models/sponsors");

const getAll = async (req, res) => {
  const result = await Sponsors.find({});

  res.json(result);
};

module.exports = getAll;
