const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const categorys = ["sell", "for-free", "lost-found"];
const gender = ["male", "female"];
const birthdayRegexp = /^\s*(3[01]|[12][0-9]|0?[1-9])\.(1[012]|0?[1-9])\.((?:19|[0-9][0-9])\d{2})\s*$/;

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
    location: {
      type: String,
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
      type: Number,
      required: [
        function () {
          return this.category === "sell";
        },
        "Price is required",
      ],
    },
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
    birthday: {
      type: String,
      maxlength: 10,
      trim: true,
      default: "00.00.0000",
    },
    idCloud: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

const Notice = model("notice", noticeSchema);

noticeSchema.post("save", handleSaveErrors);

const noticesSchema = Joi.object({
  category: Joi.string().valid("sell", "lost-found", "for-free"),
  price: Joi.number().min(1).when("category", {
    is: "sell",
    then: Joi.required(),
    otherwise: Joi.optional(),
  }),
  title: Joi.string(),
  breed: Joi.string(),
  name: Joi.string(),
  location: Joi.string(),
  sex: Joi.string().valueOf(...gender),
  comments: Joi.string(),
  avatarURL: Joi.string(),
  birthday: Joi.string().pattern(new RegExp(birthdayRegexp)),
});
const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean(),
});

const schemas = { noticesSchema, updateFavoriteSchema };
module.exports = { schemas, Notice };
