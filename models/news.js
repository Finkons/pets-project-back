const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: [true, "Set name for contact"],
      unique: true,
    },
    description: {
      type: String,
    },
    date: {
      type: String,
      default: "12/11/2022",
    },
    link: {
      type: String,
    },
  },
  { versionKey: false }
);

const News = model("news", newsSchema);

module.exports = {
  News,
};
