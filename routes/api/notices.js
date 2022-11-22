const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate, upload } = require("../../middlewares");

const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));

router.post("/category/addnotice", authenticate, validateBody(schemas.noticesSchema), upload.single("avatar"), ctrlWrapper(ctrl.add));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.put("/:id", authenticate, isValidId, ctrlWrapper(ctrl.updateFavorite));

router.get("/category/:category", ctrlWrapper(ctrl.getByCategory));

router.get("/owner/favorite", authenticate, ctrlWrapper(ctrl.getFavorite));

router.get("/owner/:owner", authenticate, ctrlWrapper(ctrl.getOwn));

module.exports = router;
