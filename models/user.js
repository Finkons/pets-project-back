const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const phoneRegexp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
const passwordRegexp = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is empty"],
    },
    address: [String],
    phone: {
      type: String,
      match: new RegExp(passwordRegexp),
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
    birthday: [String],
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
  name: Joi.string().required().messages({ "string.base": `Name must by text.` }),
  email: Joi.string().email().trim().pattern(new RegExp(emailRegexp)).required(),
  address: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp).messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  password: Joi.string()
    .min(6)
    .pattern(new RegExp(passwordRegexp))
    .trim()
    .required()
    .messages({ "string.pattern.base": "A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces" }),
});
const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .required()
    .messages({ "string.pattern.base": "A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces" }),
});
const updateSchema = Joi.object({
  username: Joi.string().required().messages({ "string.base": `Name must by text.` }),
  address: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp).messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  birthday: Joi.string(),
  avatarURL: Joi.string(),
});

const schemas = { registerSchema, loginSchema, updateSchema };
module.exports = { schemas, User };
