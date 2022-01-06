const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true },
    password:{ type: String, require: true },
    image:{ type: String, require: true },
    rol:{ type: String, require: true, default:"Guest" }, // Guest o Admin o Subscriber
    gender:{ type: String, require: true },
    favorites: { type: [String], default:[]},
    googleUser:{type:Boolean, default: false}
})

const User = mongoose.model("user", userSchema);

module.exports = User;