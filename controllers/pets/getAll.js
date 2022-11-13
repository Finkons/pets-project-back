const { Pet } = require("../../models/pets");

const getAll = async (req, res) => {
  const result = await Pet.find();
  res.json(result);
};
module.exports = getAll;
