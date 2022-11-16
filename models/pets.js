const Joi = require("joi").extend(require("@joi/date"));
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
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
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

petSchema.post("save", handleSaveErrors);

const petsSchema = Joi.object({
  name: Joi.string().min(2).max(16),
  date: Joi.date().format("DD.MM.YYYY"),
  breed: Joi.string().min(2).max(16),
  comments: Joi.string().min(8).max(120),
});

module.exports = { petsSchema, Pet };
