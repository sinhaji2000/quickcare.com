const User = require('../model/user') ;
const jwt = require("jsonwebtoken");

exports.userSignupController = async(req , res) => {

    try{
        const {name , email , password , phone , age} = req.body ;
       
        if(!name || !email || !password || !phone || !age){
            return res.status(400).json({
                message : "All fields are required" ,
                status : 400
            })
        }
        const isUserExit = await User.find({email : email}) ;
        if(isUserExit.length > 0){
            return res.status(400).json({
                message : "User already exists" ,
                status : 400
            })
        }

        const user = await User.create({ 
            name : name ,
            email : email ,
            password : password ,
            phone : phone ,
            age : age
        }) ;

        console.log(user) ;
        if(user){
            return res.status(201).json({
                message : "User created successfully" ,
                status : 201
            }) 
        }
        

    }catch(err){
        console.log(err) ;
        res.status(500).json({
            message : "Internal Error" ,
            status : 500
        })
    }
}

exports.userSigninController = async(req , res) => {

    try{

        const {email , password} = req.body ;

        if(!email || !password){
            return res.status(400).json({
                message : "All fields are required" ,
                status : 400
            })
        }

        const user = await User.find({email : email , password : password}) ;
        if(user.length === 0){
            return res.status(400).json({
                message : "Invalid credentials" ,
                status : 400
            })
        }

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "secret", {
            expiresIn: "1h",
          });

          console.log(token , "token") ;
        
         return res.json({ token });
    }catch(err){
        console.log(err) ;
        res.status(500).json({
            message : "Internal Error" ,
            status : 500
        })
    }
}

exports.profileController = async(req , res) => {
   return  res.json({ user: req.user });
}