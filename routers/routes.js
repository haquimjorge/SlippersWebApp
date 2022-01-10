const express = require("express");
const Router = express.Router();
const validator = require("../config/validator")
const shoeControllers = require("../controllers/shoeControllers");
const userControllers = require("../controllers/userControllers");
const categoryControllers = require("../controllers/categoryControllers")
const subCategoryControllers = require("../controllers/subCategoryControllers")
const passport = require("../config/passport");
const {uploadShoe, getShoes, modifyShoe, deleteShoe} = shoeControllers
const {createCategory, listCategory, readCategory, updateCategory, removeCategory} = categoryControllers
const {createSubCategory, listSubCategory, readSubCategory, updateSubCategory, removeSubCategory} = subCategoryControllers

// Rutas para el controlador de zapatos

Router.route("/shoes")
.post(uploadShoe)
.get(getShoes)
.put(modifyShoe)

Router.route("/shoe/:shoeId")
.delete(deleteShoe);


// Rutas para el controlador de usuarios
Router.route("/auth/signup")
.get(userControllers.readUsers)
.post(validator, userControllers.signUpUser)


Router.route("/auth/signin")
.post( userControllers.signInUser) 

Router.route("/auth")
.get(passport.authenticate("jwt", {session: false}), userControllers.token)
//chequea el token y si esta todo bien pasa a la accion: loguearse.

// Category
Router.route("/category")
.post(createCategory)

Router.route("/categories")
.get(listCategory)

Router.route("/category/:slug")
.get(readCategory)
.put(updateCategory)
.delete(removeCategory)

// Sub Category
Router.route("/subcategory")
.post(createSubCategory)

Router.route("/subcategories")
.get(listSubCategory)

Router.route("/subcategory/:slug")
.get(readSubCategory)
.put(updateSubCategory)
.delete(removeSubCategory)



module.exports = Router;