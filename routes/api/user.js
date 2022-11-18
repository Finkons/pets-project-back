const express = require("express");
const router = express.Router();
const ctrl = require("../../controllers/user");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate, isValidId, upload } = require("../../middlewares");
const { petsSchema } = require("../../models/pets");
const { schemas } = require("../../models/user");

router.post("/", authenticate, validateBody(petsSchema), upload.single("avatar"), ctrlWrapper(ctrl.add));

router.delete("/:id", authenticate, isValidId, ctrlWrapper(ctrl.deleteById));

router.get("/", authenticate, ctrlWrapper(ctrl.getCurrentUser));

router.post("/logout", authenticate, ctrlWrapper(ctrl.logout));

router.put("/", authenticate, validateBody(schemas.updateSchema), ctrlWrapper(ctrl.updateData));

router.patch("/", authenticate, upload.single("avatar"), ctrlWrapper(ctrl.updateAvatar));

router.get("/favorite", authenticate, ctrlWrapper(ctrl.getFavorite));

module.exports = router;
