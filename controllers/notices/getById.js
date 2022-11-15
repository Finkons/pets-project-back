const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findOne({ _id: id }).populate({ path: "owner", select: "id phone email" });
  if (result.length !== 0) {
    return res.status(200).json(result);
  }
  throw RequestError(404, "Not found");
};
module.exports = getById;
