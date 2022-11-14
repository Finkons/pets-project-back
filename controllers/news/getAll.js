const { News } = require("../../models/news");

const getAll = async (req, res) => {
  const result = await News.find({});

  res.json(result);
};

module.exports = getAll;
