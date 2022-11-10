const { News } = require("../../models/news");

const getAll = async (req, res) => {
  const news = await News.find({});

  res.json({
    message: "success",
    data: { result: news },
  });
};

module.exports = getAll;
