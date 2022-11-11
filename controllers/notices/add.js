const { Notice } = require("../../models/notice");

const add = async (req, res) => {
  const result = await Notice.create(req.body);

  res.status(200).json(result);
};

module.exports = add;
