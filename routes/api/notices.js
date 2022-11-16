const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, isValidId, authenticate } = require("../../middlewares");

const { schemas } = require("../../models/notice");

const router = express.Router();

router.get("/id/:id", isValidId, ctrlWrapper(ctrl.getById));

router.get("/:category", ctrlWrapper(ctrl.getByCategory));

router.post("/", authenticate, validateBody(schemas.noticesSchema), ctrlWrapper(ctrl.add));

router.delete("/id/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.put("/id/:id", authenticate, isValidId, ctrlWrapper(ctrl.updateFavorite));

router.get("/owner/:owner", authenticate, ctrlWrapper(ctrl.getOwn));

router.get("/favorite/favorite", authenticate, ctrlWrapper(ctrl.getFavorite));

module.exports = router;
