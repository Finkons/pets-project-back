const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Notice.findByIdAndRemove(id);
  if (result.length !== 0) {
    res.status(200).json({ message: "notice delited" });
  }
  throw RequestError(404, "Not found");
};
module.exports = deleteById;
