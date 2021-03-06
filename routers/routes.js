const express = require("express");
const Router = express.Router();
const validator = require("../config/validator")
const shoeControllers = require("../controllers/shoeControllers");
const userControllers = require("../controllers/userControllers");
const categoryControllers = require("../controllers/categoryControllers")
const subCategoryControllers = require("../controllers/subCategoryControllers")
const filesController = require("../controllers/filesControllers")
const passport = require("../config/passport");
const {uploadUserImage} = filesController
const {uploadShoe, getShoes, modifyShoe, deleteShoe, shoesCount, getShoeById,editVariation} = shoeControllers
const {googleLogin,signUpUser, signInUser,authUser, verifyEmail, addToCart, getUsers} = userControllers
const {createCategory, listCategory, readCategory, updateCategory, removeCategory, getAllCategories,modifyCategory} = categoryControllers
const {createSubCategory, listSubCategory, readSubCategory, updateSubCategory, removeSubCategory,getSubcategoryByParent, modifySubCategory,deleteSubCategory,getAllSubCategories } = subCategoryControllers

// const Payment = require("../models/payment")
// const {auth} = require("../middleware/auth")


// Rutas para el controlador de zapatos

Router.route("/shoes")
.post(uploadShoe)
.get(getShoes)
.put(modifyShoe)

Router.route("/shoe")
.put(editVariation)

Router.route("/shoe/:shoeId")
.delete(deleteShoe)
.get(getShoeById)

Router.route("/shoes/total")
.get(shoesCount)

// rutas para files
Router.route("/files/upload")
.post(uploadUserImage)

// Rutas para el controlador de usuarios
Router.route("/auth/google")
.post(validator, googleLogin)

Router.route("/users")
.get(getUsers)

Router.route("/auth/signup")
.post(validator, signUpUser)

Router.route("/auth/signin")
.post(signInUser) 

Router.route("/verify/:uniqueString").get(verifyEmail);

//chequea el token y si esta todo bien pasa a la accion: loguearse.
Router.route("/auth")
.get(passport.authenticate("jwt", {session: false}), authUser)

// Category
Router.route("/category")
.post(createCategory)

Router.route("/categories")
.get(listCategory)

Router.route("/allcategories")
.get(getAllCategories)
.put(modifyCategory)

Router.route("/category/:slug")
.get(readCategory)
.put(updateCategory)
.delete(removeCategory)

// Sub Category
Router.route("/subcategory")
.post(createSubCategory)

Router.route("/subcategories")
.get(listSubCategory)
.put(modifySubCategory)

Router.route("/subcategory/:slug")
.get(readSubCategory)
.put(updateSubCategory)
.delete(removeSubCategory)

Router.route("/allsubcategory/:id")
.delete(deleteSubCategory)

Router.route("/subcategories/:parentId")
.get(getSubcategoryByParent)

Router.route("/allsubcategories")
.get(getAllSubCategories)


Router.route("/cart")
.put(addToCart)







module.exports = Router;