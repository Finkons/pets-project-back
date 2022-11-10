const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    time: {
      type: String,
    },
    adress: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
    logo: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { versionKey: false }
);

const Friends = model("friends", newsSchema);

module.exports = {
  Friends,
};
