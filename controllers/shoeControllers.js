const Shoe = require('../models/Shoe')


const shoeControllers ={
    uploadShoe : async(req,res)=>{
        try{
            const{ name,price,lastPrice,color,size,image,season,gender} = req.body
            await new Shoe({name,price,lastPrice,color,size,image,season,gender}).save()
            console.log('aqui estoy')
            res.json({success:true,response:'uploaded show with name' + name, error:null})
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
    }

}

module.exports = shoeControllers