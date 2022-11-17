const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/:owner", authenticate, ctrlWrapper(ctrl.getOwn));

module.exports = router;
