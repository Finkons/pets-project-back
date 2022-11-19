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
    like: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
      },
    ],
    notices: [
      {
        type: Schema.Types.ObjectId,
        ref: "notice",
      },
    ],
    pets: [
      {
        type: Schema.Types.ObjectId,
        ref: "pets",
      },
    ],
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
  birthday: Joi.string(),
});

const loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string()
    .required()
    .messages({ "string.pattern.base": "A password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number with no spaces" }),
});
const updateSchema = Joi.object({
  name: Joi.string().required().messages({ "string.base": `Name must by text.` }),
  address: Joi.string(),
  phone: Joi.string().pattern(phoneRegexp).messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
  birthday: Joi.string(),
  avatarURL: Joi.string(),
});

const schemas = { registerSchema, loginSchema, updateSchema };
module.exports = { schemas, User };
