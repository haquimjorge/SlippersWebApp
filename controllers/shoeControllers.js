const Shoe = require('../models/Shoe')
const slugify = require("slugify");

const shoeControllers = {
    

  modifyShoe: async (req, res) => {
    try {
      const { id } = req.body;
      const modifiedShoe = await Shoe.findOneAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true }
      );
      res.json({ success: true, error: null, response: modifiedShoe });
    } catch (e) {
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
        response: "deleted shoe: " + JSON.stringify(deletedShoe),
      });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  shoesCount: async(req, res) => {
    let total = await Shoe.find({}).estimatedDocumentCount().exec()
    res.json(total)
  },

    uploadShoe : async(req,res)=>{
        try{
            const{ name,price,description,lastPrice,color,size,image,season,gender,variations,category,subCategory,shipping} = req.body
            let newShoe= await new Shoe({name,price,description,lastPrice,color,size,image,season,gender,variations,slug:slugify(name),category,subcategory:subCategory,shipping}).save()
            res.json({success:true,response:newShoe,error:null})
        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    },
    getShoes : async(req,res)=>{
        try{
            const shoes = await Shoe.find().populate('subcategory').populate('category')
            res.json({success:true,response:shoes,error:null})

    } catch(err){
        res.json({ success: false, error: e, response:null });
        console.error(e);
    }
  },
  getShoeById : async (req,res)=>{
      try{
          const newShoe = await Shoe.findOne({_id:req.params.shoeId})
          res.json({success:true,response:newShoe,error:null})

      }catch(e){
        res.json({ success: false, error: e, response:null });
        console.error(e); 
      }
  }

};

module.exports = shoeControllers;
