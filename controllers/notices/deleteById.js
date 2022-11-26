const { Notice } = require("../../models/notice");
const { RequestError } = require("../../helpers");
const { deleteImage } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const data = await Notice.findById(id);
  const idPublic = data.idCloud;
  await deleteImage(idPublic);
  const result = await Notice.findByIdAndRemove(id);
  if (!result) {
    throw RequestError(404, "Not found");
  }
  res.status(200).json({ message: "notice delited" });
};
module.exports = deleteById;
