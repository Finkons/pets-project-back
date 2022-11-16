const { Schema, model } = require("mongoose");

const newsSchema = Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    adressUrl: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    address: {
      type: String,
    },
    workDays: {
      type: String,
    },
    phone: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { versionKey: false }
);

const Sponsors = model("sponsors", newsSchema);

module.exports = {
  Sponsors,
};
