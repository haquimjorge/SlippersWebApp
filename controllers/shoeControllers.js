const Shoe = require('../models/Shoe')


const shoeControllers ={
    uploadShoe : async(req,res)=>{
        try{
            const{ name,price,description,lastPrice,color,size,image,season,gender} = req.body
            await new Shoe({name,price,description,lastPrice,color,size,image,season,gender}).save()
            console.log('aqui estoy')
            res.json({success:true,response:'uploaded shoe with name ' + name, error:null})
        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    },
    getShoes : async(req,res)=>{
        try{
            const shoes = await Shoe.find()
            res.json({success:true,response:shoes,error:null})

        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    },
    modifyShoe: async(req,res)=>{
        try{
            const {id}=req.body
            const modifiedShoe = await Shoe.findOneAndUpdate({_id: id}, {...req.body},{new:true})
            res.json({success:true, error:null, response:"modified shoe: " + JSON.stringify(modifiedShoe) })
        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    },
    deleteShoe: async(req,res)=>{
        try{
            const deletedShoe= await Shoe.findOneAndDelete({_id: req.params.shoeId})
            res.json({success:true, error:null, response: 'deleted shoe: '+ JSON.stringify(deletedShoe)})
        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    },
    addToFav: async (req,res)=>{
        try{
            // funcion para guardar el id del zapato que llega desde el body, dentro de la lista de favoritos del usuario

        }catch(e){
            res.json({ success: false, error: e, response:null });
            console.error(e);
        }
    }

}

module.exports = shoeControllers