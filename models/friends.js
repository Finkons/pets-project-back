const { Schema, model } = require("mongoose");
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
const newsSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    time: [
      {
        day: {
          type: String,
          enum: ["MN", "TU", "WE", "TH", "FR", "SA", "SU"],
        },
        start: String,
        end: String,
      },
    ],
    adress: {
      type: String,
    },
    phone: {
      type: String,
      match: phoneRegexp,
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
