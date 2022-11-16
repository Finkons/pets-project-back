const { Pet } = require("../../models/pets");
const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  await Pet.find({ owner })
    .populate("owner")
    .then(user => {
      res.json(user);
    });
};
module.exports = getAll;
