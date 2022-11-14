const express = require("express");

const router = express.Router();

const ctrl = require("../../controllers/pets");

const { ctrlWrapper } = require("../../helpers");

const { validateBody, authenticate } = require("../../middlewares");

const { petsSchema } = require("../../models/pets");

router.get("/pets", ctrlWrapper(ctrl.getAll));

router.post("/pets", authenticate, validateBody(petsSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.deleteById));

module.exports = router;
