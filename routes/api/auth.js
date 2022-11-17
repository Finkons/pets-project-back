const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody } = require("../../middlewares");

const { schemas } = require("../../models/user.js");

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

module.exports = router;
