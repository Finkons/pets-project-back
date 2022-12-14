const express = require("express");

const ctrl = require("../../controllers/friends");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

module.exports = router;
