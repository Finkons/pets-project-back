const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const categorys = ["sell", "for-free", "lost-found"];
const gender = ["male", "female", "young", ""];
const locationSchema = new Schema({
  city: {
    type: String,
    // required: [true, "Set city"],
  },
  region: {
    type: String,
    // required: [true, "Set region"],
  },
});
const noticeSchema = new Schema(
  {
    category: {
      type: String,
      enum: categorys,
      required: [true, "Set category for notice"],
    },
    title: {
      type: String,
      required: [true, "Set title for notice"],
    },
    age: {
      type: [String],
    },
    name: {
      type: String,
    },
    birthday: {
      type: String,
    },
    breed: {
      type: String,
    },
    location: locationSchema,
    sex: {
      type: String,
      enum: gender,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    price: {
      type: String,
    },
    favorite: { type: Boolean, default: false },
    fans: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    avatarURL: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

noticeSchema.post("save", handleSaveErrors);

const noticesSchema = Joi.object({
  category: Joi.string().valueOf(...categorys),
  title: Joi.string(),
  age: Joi.string(),
  place: Joi.string(),
  name: Joi.string(),
  birthday: Joi.string(),
  breed: Joi.string(),
  location: Joi.string(),
  sex: Joi.string().valueOf(...gender),
  price: Joi.string(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { noticesSchema, updateFavoriteSchema };
module.exports = { schemas, Notice };
