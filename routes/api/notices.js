const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId } = require("../../middlewares");

const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

router.get("/:category", ctrlWrapper(ctrl.getByCategory));

router.post("/", validateBody(schemas.noticesSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
