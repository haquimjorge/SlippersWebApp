const express = require("express");
const Router = express.Router();
const validator = require("../config/validator")
const passport = require('../config/passport');
const shoeControllers = require("../controllers/shoeControllers");

const {uploadShoe, getShoes} = shoeControllers


Router.route("/shoes").post(uploadShoe).get(getShoes)

module.exports = Router;