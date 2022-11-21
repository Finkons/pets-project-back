const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const categorys = ["sell", "in good hands", "lost/found"];
const gender = ["male", "female"];
const locationSchema = new Schema({
  city: {
    type: String,
  },
  region: {
    type: String,
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
    breed: {
      type: String,
    },
    name: {
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
    price: { type: String },
    fans: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    avatarURL: {
      type: String,
    },
    comments: {
      type: String,
      minlength: 8,
      maxlength: 120,
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

noticeSchema.post("save", handleSaveErrors);

const noticesSchema = Joi.object({
  category: Joi.array().items({
    type: Joi.string()
      .valueOf(...gender)
      .required(),
  }),
  price: Joi.number().when("sell", {
    is: true,
    then: Joi.number().min(0).required(),
  }),
  title: Joi.string(),
  breed: Joi.string(),
  name: Joi.string(),
  location: Joi.string(),
  sex: Joi.string().valueOf(...gender),
  comments: Joi.string(),
  avatarURL: Joi.string(),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { noticesSchema, updateFavoriteSchema };
module.exports = { schemas, Notice };
