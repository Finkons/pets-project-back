const Joi = require("joi").extend(require("@joi/date"));
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const petSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Name is empty"],
    },
    date: {
      type: String,
      required: [true, "Date is empty"],
    },
    breed: {
      type: String,
      minlength: 2,
      maxlength: 16,
      required: [true, "Breed is empty"],
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
      required: [true, "Comments is empty"],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

petSchema.post("save", handleSaveErrors);

const petsSchema = Joi.object({
  name: Joi.string().min(2).max(16).required(),
  date: Joi.date().format("DD.MM.YYYY").required(),
  breed: Joi.string().min(2).max(16).required(),
  comments: Joi.string().min(8).max(120).required(),
});

module.exports = { petsSchema, Pet };
