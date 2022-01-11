const User = require("../models/User");
const bcryptjs =require("bcryptjs") //encripta y desencripta
const jwt = require('jsonwebtoken'); //crea y valida el token
const nodemailer = require("nodemailer");
var crypto = require("crypto");

const sendEmail = async(email,uniqueString)=>{
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port:'465',
        secure: true,
        auth:{
            user: 'SlippersWebApp@gmail.com',
            pass: `${process.env.MAIL_PASS}`
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    let sender = 'SlippersWebApp@gmail.com'
    let mailOptions = {
        from : sender,
        to:email,
        subject: "Slippers - Please verify your account",
        html: `
        <div>
            <img style="display: block;
            margin-left: auto;
            margin-right: auto;
            width: 15rem;
            height:15rem;" src='https://i.imgur.com/NifPrJC.png' alt='logo slippers'/>
            <h2 style="text-align:center;  font-size: 1.5rem;">Thanks for registering with us!</h2>
            <p style="text-align:center; font-size: 1.2rem;">Please, follow <a href="http://localhost:3000/verify/${uniqueString}">this</a> link to verify your account</p>
        </div>`
    }
    await transporter.sendMail(mailOptions)
}

const userControllers = {
  addToFav: async (req, res) => {
    try {
      const { userId, shoeId, isLiked } = req.body;
      //   si esta likeado, se elimina; de lo contrario, se agrega
      const action = isLiked ? "$pull" : "$push";
      const updatedUser = User.findOneAndUpdate(
        { _id: userId },
        { [action]: { favorites: shoeId } },
        { new: true }
      );
      res.json({ success: true, error: null, response: updatedUser });

      // funcion para guardar o eliminar el id del zapato que llega desde el body, segun un isLiked (esto se verifica en frontend, para asi no molestar a la base de datos con los datos del usuario. Como ya tenemos el usuario cargado en redux, lo verificamos ahi mismo.)
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.error(e);
    }
  },
  googleLogin: async (req, res) => {
    const { name, lastName, email, password, image, googleUser } =
      req.body;
    let user = await User.findOne({ email });
    try {
      if (user) {
        if (user.googleUser) {
          const token = jwt.sign({ user }, process.env.SECRET_KEY);
          return res.json({
            response: user,
            success: true,
            error: null,
            token: token,
          });
          
        }
      }
      if (user) {
        res.json({
          response: null,
          success: false,
          error: "Please log in via google",
        });
        
      } else {
        const passwordHashed = bcryptjs.hashSync(password, 10);
        let user = await new User({
          name,
          lastName,
          email,
          password: passwordHashed,
          image,
          googleUser,
        }).save();
        const token = jwt.sign({ user }, process.env.SECRET_KEY);
        

        res.json({ response: user, success: true, error: null, token: token });
      }
    } catch (e) {
      res.json({ success: false, error: e, response: null });
      console.log(e)
    }
  },
  signUpUser: async (req, res) => { // creamos una funcion para registrar un usuario
    const {name, lastName, email,password,image,gender} = req.body
  
    try{
      const user = await User.findOne({email}) //user del nombre del modelo
      if(user){
        res.json({success:false, error:"Email already registered", response: null}) //si el usuario ya existe
      }else{
        const passwordHashed = bcryptjs.hashSync(password,10) //salt = string o num. 10 x defecto. num de pasos para encriptar 
        var uniqueString = crypto.randomBytes(15).toString('hex')
        const user = await new User( //creamos un nuevo usuario
        {name, 
          lastName, 
          email, 
          password: passwordHashed, 
          image,
          gender,
          uniqueString
        }).save()
        await sendEmail(email,uniqueString)
        res.json({success:true, message:"Verification sent. Please check your email", response:null,error:null})
      }

      }catch(error){ //si hay un error
        res.json({success:false, response:null, error:error}) //si hay un error en el registro de usuario 
        console.log(error)
      }
    },
    getUsers: async (req, res) => {
        try {
          let users = await User.find();
          res.json({ response: users, success: true,error:null });
        } catch (e) {
          res.json({ success: false, error: e,respose:null });
        }
      },
      signInUser: async (req, res) => {
        const { email, password, googleUser } = req.body;
        try {
          let user = await User.findOne({ email });
    
          if (user) {
            if(!user.emailVerified){
                return res.json({
                    success: false,
                    response: null,
                    error: "Please verify your email",
                  });
              }
            let samePassword = user
              ? bcryptjs.compareSync(password, user.password)
              : false;
            if (user && samePassword) {
              const token = jwt.sign({ user }, process.env.SECRET_KEY);
              res.json({
                success: true,
                response: user,
                error: null,
                token: token,
              });
            } else if (user.googleUser && !googleUser) {
              res.json({
                success: false,
                response: null,
                error: "Invalid Email",
              });
            } else {
              res.json({
                success: false,
                response: null,
                error: "The username or password is incorrect",
              });
            }
          } else {
            res.json({
              success: false,
              response: null,
              error: "Email is not registered",
            });
          }
        } catch (e) {
          res.json({ success: false, error: e.message, response: null });
        }
      },
    authUser: (req, res) => {
        try {
        const userAuth = req.user;
        res.json({ success: true, response: userAuth, error: null });
        } catch (e) {
        res.json({ success: false, response: null, error: e });
        }
    },
    verifyEmail : async(req,res)=>{
        const {uniqueString} = req.params
        const user = await User.findOne({uniqueString})
        if(user){
            user.emailVerified=true
            await user.save()
          const token = jwt.sign({ user }, process.env.SECRET_KEY);
          res.json({
            success: true,
            response: user,
            error: null,
            token: token,
            message: "¡Account verification successfully! Logging in with your account automatically"
          });
        }else if(!user){
            res.json({success:false,response:null,error:'Your email could not be verified', message:null})
        }else{
            res.json({success:false,response:null,error:'Your email could not be verified', message:null})
        }
  
    }
    
};

module.exports = userControllers
