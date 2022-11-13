const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is empty"],
    },
    address: [String],
    phone: {
      type: String,
      match: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    birthday: [Number],
    token: {
      type: String,
      default: null,
    },
    avatarURL: {
      type: String,
    },
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const User = model("user", userSchema);

userSchema.post("save", handleSaveErrors);

const registerSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  password: Joi.string().required(),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = { registerSchema, loginSchema };
module.exports = { schemas, User };
