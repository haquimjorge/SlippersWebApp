const express = require("express");
const Router = express.Router();
const validator = require("../config/validator")
const passport = require('../config/passport');
const shoeControllers = require("../controllers/shoeControllers");

const {uploadShoe, getShoes, modifyShoe, deleteShoe} = shoeControllers


Router.route("/shoes").post(uploadShoe).get(getShoes).put(modifyShoe)

Router.route("/shoe/:shoeId").delete(deleteShoe);

module.exports = Router;