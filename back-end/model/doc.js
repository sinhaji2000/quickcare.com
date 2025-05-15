const mongoose = require('mongoose') ;

const docSchema = new mongoose.Schema({

    name : {
        type : String ,
        required : true
    }  ,
    email : {
        type : String ,
        required : true
    }  ,
    password : {
        type : String ,
        required : true
    }  ,
    phone : {
        type : String ,
        required : true
    }  ,
    age : {
        type : Number ,
        required : true
    },
    address :{
         house_No : {
            type : String ,
            
         } ,
         locality:{
            type : String
         } ,
         city : {
            type : String ,
            required : true
         } ,
         pinCode : {
            type : Number ,
            required : true ,

        }

    }
})

const Doc = mongoose.model('Doc' , docSchema) ;
module.exports = Doc;