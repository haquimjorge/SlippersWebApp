const Shoe = require("../models/Shoe");
const slugify = require("slugify");

const shoeControllers = {
  modifyShoe: async (req, res) => {
    try {
        console.log(req.body)
      const { id } = req.body;
      const modifiedShoe = await Shoe.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      console.log(modifiedShoe)
      res.json({ success: true, error: null, response: modifiedShoe });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  editVariation : async(req,res)=>{
    try{
      //   let shoeVariation = await Shoe.findOne({_id:req.body.id})
      //   let variationExist = shoeVariation.variations.some(v=> v.color === req.body.color && v.size === req.body.size) // entrega true si la variacion ya existe
      //   if(variationExist){
      //       res.json({success:false, error: "Duplicated variation detected.", response:null})
      //   } se puede hacer en front, usando los datos de los zapatos que ya tengo en redux
      let variationExist = req.body.variationExist
      let action = variationExist? "$pull" : "$push"
      let addedShoe = await Shoe.findOneAndUpdate({_id: req.body.id},{[action]: {variations: req.body.variation}, generalStock : req.body.generalStock }, {new:true}).lean()
      console.log(addedShoe)
      res.json({success:true,error:null,response:addedShoe})

    }catch(e){
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
},
  deleteShoe: async (req, res) => {
    try {
      const deletedShoe = await Shoe.findOneAndDelete({
        _id: req.params.shoeId,
      });
      res.json({
        success: true,
        error: null,
        response: deletedShoe,
      });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  shoesCount: async (req, res) => {
    let total = await Shoe.find({}).estimatedDocumentCount().exec();
    res.json(total);
  },

  uploadShoe: async (req, res) => {
    try {
      const {
        name,
        price,
        description,
        lastPrice,
        color,
        size,
        stock,
        image,
        season,
        gender,
        category,
        subCategory,
        shipping,
      } = req.body;
      let variation = { color,size,stock}
      console.log(req.body)
      let newShoe = await new Shoe({
        name,
        price,
        description,
        generalStock:stock,
        lastPrice,
        variations:variation,
        image,
        season,
        gender,
        slug: slugify(name),
        category,
        subcategory: subCategory,
        shipping,
      }).save();
      console.log(newShoe)
      res.json({ success: true, response: newShoe, error: null });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  getShoes: async (req, res) => {
    try {
      const shoes = await Shoe.find()
        .populate("subcategory")
        .populate("category")
        .exec();
      res.json({ success: true, response: shoes, error: null });
    } catch (err) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  getShoeById: async (req, res) => {
    try {
      console.log(req.params)
      const newShoe = await Shoe.findOne({ _id: req.params.shoeId }).populate("category").populate("subcategory").exec();
      res.json({ success: true, response: newShoe, error: null });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
};

module.exports = shoeControllers;
