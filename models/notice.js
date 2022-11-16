const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const categorys = ["sell", "for-free", "lost-found"];
const gender = ["male", "female", "young", ""];
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
    location: {
      type: [String],
      required: true,
    },
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
    fans: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    favorite: { type: Boolean, default: false },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

noticeSchema.post("save", handleSaveErrors);

const noticesSchema = Joi.object({
  category: Joi.string()
    .valueOf(...categorys)
    .required(),
  title: Joi.string().required(),
  age: Joi.string(),
  place: Joi.string().required(),
  name: Joi.string(),
  birthday: Joi.string(),
  breed: Joi.string(),
  location: Joi.string(),
  sex: Joi.string().valueOf(...gender),
  price: Joi.string(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = { noticesSchema, updateFavoriteSchema };
module.exports = { schemas, Notice };
