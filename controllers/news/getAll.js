const { News } = require("../../models/news");
const { RequestError } = require("../../helpers");

const getAll = async (req, res) => {
  const { query } = req.query;
  if (!query) {
    const result = await News.find().sort("-date");
    if (result.length !== 0) {
      return res.status(200).json(result);
    }
    throw RequestError(404, "Not found");
  }
  const result = await News.find({ title: { $regex: `${query}` } }).sort("-date");
  if (result.length !== 0) {
    return res.status(200).json(result);
  }
  throw RequestError(404, "Not found");
};

module.exports = getAll;
