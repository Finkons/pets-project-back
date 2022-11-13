const Joi = require("joi");
const { Schema, model } = require("mongoose");
const { handleSaveErrors } = require("../helpers");

const nameRegexp = /^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/;
const emailRegexp = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
const phoneRegexp = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is empty"],
      minlength: 3,
      match: nameRegexp,
      trim: true,
      unique: true,
    },
    address: {
      type: String,
      trim: true,
      default: "Hometown",
    },
    phone: {
      type: String,
      match: phoneRegexp,
      minlength: 10,
      trim: true,
      default: "+38000000000",
      unique: true,
    },
    password: {
      type: String,
      minlength: 6,
      required: [true, "Password is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
    },
    birthday: {
      type: String,
      maxlength: 8,
      trim: true,
      default: "00000000",
    },
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
  address: Joi.string(),
  phone: Joi.string().pattern(new RegExp(phoneRegexp)),
  password: Joi.string().required(),
  email: Joi.string().pattern(new RegExp(emailRegexp)).required(),
  birthday: Joi.string().max(8),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

const schemas = { registerSchema, loginSchema };
module.exports = { schemas, User };
