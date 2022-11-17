const { Pet } = require("../../models/pets");
const { RequestError } = require("../../helpers");

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Pet.findByIdAndRemove(id);
  if (!result) {
    throw RequestError({ status: 404 });
  }
  res.json({
    message: "Pet deleted",
  });
};

module.exports = deleteById;
