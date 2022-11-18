const add = require("./add");
const getAll = require("./getAll");
const deleteById = require("./deleteById");
const getCurrentUser = require("./getCurrentUser");
const logout = require("./logout");
const updateAvatar = require("./updateAvatar");
const updateData = require("./updateData");
const getFavorite = require("./getFavorite");

module.exports = {
  add,
  getAll,
  deleteById,
  getCurrentUser,
  logout,
  updateData,
  updateAvatar,
  getFavorite,
};
