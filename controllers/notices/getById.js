const { Notice } = require("../../models/notice");

const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const result = await Notice.findById(req.params.id);
  if (result.length !== 0) {
    return res.status(200).json(result);
  }
  throw RequestError(404, "Not found");
};
module.exports = getById;
