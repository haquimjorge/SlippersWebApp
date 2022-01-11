const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  lastName: { type: String, require: true },
  email: { type: String, require: true },
  uniqueString: {type : String},
  emailVerified:{type:Boolean, default:false},
  password: { type: String, require: true },
  image: { type: String, require: true },
  rol: {
    type: String,
    require: true,
    default: "Guest",
    enum: ["Guest", "Admin", "Subscriber"],
  }, // Guest o Admin o Subscriber
  gender: { type: String, require: true, enum: ["Male", "Female", "Other"] },
  favorites: { type: [String], default: [] },
  googleUser: { type: Boolean, default: false },
});

const User = mongoose.model("user", userSchema);

module.exports = User;
