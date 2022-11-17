const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/pets");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, isValidId, upload } = require("../../middlewares");
const { petsSchema } = require("../../models/pets");

router.get("/pets", authenticate, ctrlWrapper(ctrl.getAll));

router.post("/pets", authenticate, validateBody(petsSchema), upload.single("avatar"), ctrlWrapper(ctrl.add));

router.delete("/pets/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.get("/current", authenticate, ctrlWrapper(ctrl.getCurrentUser));

module.exports = router;
