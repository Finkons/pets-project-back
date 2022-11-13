const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/user");

router.post("/register", validateBody(schemas.registerSchema), ctrlWrapper(ctrl.register));

router.post("/login", validateBody(schemas.loginSchema), ctrlWrapper(ctrl.login));

router.post("/user", authenticate, ctrlWrapper(ctrl.logout));

router.get("/user", authenticate, ctrlWrapper(ctrl.current));

router.put("/user", authenticate, validateBody(schemas.updateSchema), ctrlWrapper(ctrl.updateData));

module.exports = router;
