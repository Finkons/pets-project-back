const Joi = require("joi");
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
      type: Date,
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
  },
  { versionKey: false, timestamps: true }
);

const Pet = model("pet", petSchema);

petSchema.post("save", handleSaveErrors);

const petsSchema = Joi.object({
  name: Joi.string().required(),
  date: Joi.string().required(),
  breed: Joi.string().required(),
  comments: Joi.string().required(),
});

module.exports = { petsSchema, Pet };
