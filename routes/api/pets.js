const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/pets");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, isValidId } = require("../../middlewares");
const { petsSchema } = require("../../models/pets");

router.get("/pets", authenticate, ctrlWrapper(ctrl.getAll));

router.post("/pets", authenticate, validateBody(petsSchema), ctrlWrapper(ctrl.add));

router.delete("/pets/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

module.exports = router;
