const Shoe = require("../models/Shoe");

const shoeControllers = {
  uploadShoe: async (req, res) => {
    try {
      console.log(req.body);
      const {
        name,
        price,
        description,
        lastPrice,
        color,
        size,
        image,
        season,
        gender,
        variations,
        slug,
        category,
        subcategory,
        shipping,
      } = req.body;
      let newShoe = await new Shoe({
        name,
        price,
        description,
        lastPrice,
        color,
        size,
        image,
        season,
        gender,
        variations,
        slug,
        category,
        subcategory,
        shipping,
      }).save();
      console.log(newShoe);
      res.json({ success: true, response: newShoe, error: null });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  getShoes: async (req, res) => {
    try {
      const shoes = await Shoe.find();
      res.json({ success: true, response: shoes, error: null });
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
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
  shoePagination: async(req, res) => {
    try {
      const {page} = req.body
      const currentPage = page || 1
      const perPage = 6

      const shoes = await Shoe.find({})
      .skip((currentPage -1) * perPage)
      .populate("category")
      .populate("subcategory")
      .exec()

      res.json(shoes)
    } catch(err){
      console.log(err)
    }
  }

};

module.exports = shoeControllers;
