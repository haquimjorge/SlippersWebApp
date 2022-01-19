const User = require('../models/User')
const Shoe = require('../models/Shoe')
const fs = require('fs')
const crypto = require('crypto')

const filesControllers = {
    uploadUserImage : async(req,res)=>{
        try{
            let user = await User.findOne({email:req.body.user})
            if(user.image === "url"){
                const email = req.body.user
                const {file} = req.files
                const name= file.name
                const id = crypto.randomBytes(10).toString('hex') + "." + name.split(".")[name.split(".").length - 1];
                const fileName={id:id,name:name}
                const ruta = `${__dirname}../../frontend/public/files/${id}`
                file.mv(ruta)
    
    
                // aca se acutaliza el usuario
                let modifiedUser = await User.findOneAndUpdate({email},{image:id}, {new:true})
                res.json({success: true, error:null, response:modifiedUser})
                
            }else if(user){
                res.json({error:"Email already taken"})
            }else{
                res.json({error:"Error, please try again"})
            }          
        }catch(e){
            res.json({ success: false, error: e, response: null });
            console.error(e);
        }
        
        

    }

}

module.exports = filesControllers