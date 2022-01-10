const express = require("express");
const Router = express.Router();
const validator = require("../config/validator")
const shoeControllers = require("../controllers/shoeControllers");
const userControllers = require("../controllers/userControllers");
const passport = require("../config/passport");
const {uploadShoe, getShoes, modifyShoe, deleteShoe} = shoeControllers
const {googleLogin,signUpUser, signInUser,authUser} = userControllers

// Rutas para el controlador de zapatos

Router.route("/shoes")
.post(uploadShoe)
.get(getShoes)
.put(modifyShoe)

Router.route("/shoe/:shoeId")
.delete(deleteShoe);


// Rutas para el controlador de usuarios
Router.route("/auth/google")
.post(validator, googleLogin)

Router.route("/auth/signup")
.post(validator, signUpUser)

Router.route("/auth/signin")
.post(signInUser) 

Router.route("/auth")
.get(passport.authenticate("jwt", {session: false}), authUser)
//chequea el token y si esta todo bien pasa a la accion: loguearse.

module.exports = Router;