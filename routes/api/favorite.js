const express = require("express");

const ctrl = require("../../controllers/notices");

const { ctrlWrapper } = require("../../helpers");

const { authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/", authenticate, ctrlWrapper(ctrl.getFavorite));

module.exports = router;
