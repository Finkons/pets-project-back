const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/", authenticate, validateBody(schemas.noticesSchema), upload.single("avatar"), ctrlWrapper(ctrl.add));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.put("/:id", authenticate, isValidId, ctrlWrapper(ctrl.updateFavorite));

router.get("/category/:category", ctrlWrapper(ctrl.getByCategory));

module.exports = router;
