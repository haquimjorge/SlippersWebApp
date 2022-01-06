const mongoose = require("mongoose");

const shoeSchema = new mongoose.Schema({
    name: { type: String, require: true },
    price: { type: Number, require: true },
    lastPrice:{type:Number},
    color: { type: String, require: true },
    description: { type: String, require: true },
    size:{ type: Number, require: true },
    image:{ type: String, require: true },
    season:{ type: String, default: 'All Seasons' }, 
    gender:{ type: String, default: 'Unisex' },
})

const Shoe = mongoose.model("shoe", shoeSchema);

module.exports = Shoe;