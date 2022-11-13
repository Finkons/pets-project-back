const { Pet } = require("../../models/pets");

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const result = await Pet.create({ ...req.body, owner });
  res.status(201).json(result);
};

module.exports = add;
