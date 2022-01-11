const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const shoeSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    price: { type: Number, require: true },
    lastPrice: { type: Number },
    stock: { Number, default: 0 },
    variations: [
      {
        size: { type: String },
        color: { type: String },
        stock: { type: Number },
      },
    ],
    description: { type: String, require: true },
    image: { type: String, require: true },
    season: { type: String, default: "All Seasons" },
    gender: { type: String, default: "Unisex" },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    category: {
      type: ObjectId,
      ref: "category",
    },
    subcategory: [
      {
        type: ObjectId,
        ref: "subcategory",
      },
    ],
    shipping: {
      type: String,
      enum: ["Yes", "No"],
    },
    //   ratings: [{
    //       star: Number,
    //       postedBy: {type: ObjectId, ref: "user"}
    //   }]
  },
  { tymestamps: true }
);

// const zapatoNike={
// name:'nike sport',
// stock:0,
// variation:[{
//     color:'verde',
//     size:40,
//     stock:5
// },
// {
//     color:'azul',
//     size:42,
//     stock:3
// },
// {
//     color:'blacno',
//     size:44,
//     stock:55
// },
// {
//     color:'verde',
//     size:45,
//     stock:7
// }]
// }
// let suma=0
// const sumaStock = zapatoNike.variation.forEach(element => {
//     suma+=element.stock
// });

//     let color='verde'
//     let size=40
//     let stock
//     zapatoNike.variation.forEach((e)=>{
//         e.color === color && e.size === size ? stock=e.stock : null
//     })

//     console.log(stock)

const Shoe = mongoose.model("shoe", shoeSchema);

module.exports = Shoe;
