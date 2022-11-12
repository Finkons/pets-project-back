const { Notice } = require("../../models/notice");

const { RequestError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.json(result);
};

module.exports = updateFavorite;
