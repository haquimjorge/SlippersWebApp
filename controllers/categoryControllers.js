const Category = require("../models/Category");
const SubCategory = require("../models/SubCategory");
const slugify = require("slugify");

const categoryControllers = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const category = await new Category({ name, slug: slugify(name) }).save();
      res.json(category);
    } catch (err) {
      res.status(400).send("Create category failed");
    }
  },
  listCategory: async (req, res) => {
    res.json(await Category.find({}).sort({ createdAt: -1 }).exec());
  },
  readCategory: async (req, res) => {
    let category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  },
  removeCategory: async (req, res) => {
    try {
        // se mantiene nombre de varibale slug para no contaminar otras funciones. (req.params.slug=req.params.id)
      const deleted = await Category.findOneAndDelete({
        _id: req.params.slug,
      });
      await SubCategory.deleteMany({parent:req.params.slug})
      res.json(deleted);
    } catch (err) {
      res.status(400).send("Delete category failed");
    }
  },
  updateCategory: async (req, res) => {
    const { name } = req.body;
    try {
      const updated = await Category.findOneAndUpdate(
        { slug: req.params.slug },
        { name, slug: slugify(name) },
        { new: true }
      );
      res.json(updated);
    } catch (err) {
      res.status(400).send("Update category failed");
    }
  },
  getAllCategories : async (req,res)=>{
      try{
          let categories = await Category.find().sort({createdAt:-1}).exec()
          res.json({success:true, error:null, response:categories})

      }catch(e){
        res.json({ success: false, error: e,respose:null });
      }
  }
};

module.exports = categoryControllers;
