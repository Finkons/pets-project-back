const { Friends } = require("../../models/friends");

const getAll = async (req, res) => {
  const friends = await Friends.find({});

  res.json({
    message: "success",
    data: { result: friends },
  });
};

module.exports = getAll;
