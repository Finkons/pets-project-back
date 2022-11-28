const Joi = require("joi").extend(require("@joi/date"));
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const birthdayRegexp = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|20)\d{2})\s*$/;
const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
    },
    birthday: {
      type: String,
      match: birthdayRegexp,
    },
    date: {
      type: String,
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 16,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
    },
    avatarURL: {
      type: String,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    idCloud: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pets", petSchema);

petSchema.post("save", handleSaveErrors);

const petsSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  date: Joi.date().format("DD.MM.YYYY"),
  breed: Joi.string().min(2).max(16),
  comments: Joi.string().min(8).max(120),
  birthday: Joi.string().pattern(new RegExp(birthdayRegexp)),
});

module.exports = { petsSchema, Pet };
