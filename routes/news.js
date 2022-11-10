const express = require("express");

const { news: ctrl } = require("../controllers");

const { ctrlWrapper } = require("../helpers");

const router = express.Router();

router.get("/", ctrlWrapper(ctrl.getAll));

module.exports = router;
