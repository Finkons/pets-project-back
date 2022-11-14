const { Notice } = require("../../models/notice");

const getAll = async (req, res) => {
  const { page = 1, limit = 10, ...query } = req.query;
  console.log(query);
  const skip = (page - 1) * limit;
  const result = await Notice.find({ ...query }, "-createdAt -updatedAt", { skip, limit });
  res.status(200).json(result);
};

module.exports = getAll;
