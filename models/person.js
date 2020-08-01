const mongoose=require('mongoose');
const personSchema=new mongoose.Schema({

    name:{
        type:String
    },
    homeaddress:{
        type: String
    },
    workaddress:{
        type:String
    },
    work:{
        type:String
    },
    phone1:{
        type:Number
    },
    phone2:{
        type:Number
    },
    phone3:{
        type:Number
    },
    witness1:{
        type:String
    },
    
    witness2:{
        type:String
    },
    witness3:{
        type:String
    },
    adharcard:{
        type:String
    },
    cheque:{
        type:String
    },
    personphoto:{
       type: String
    } ,
    location:{
        type:String
    }
});
const person=mongoose.model('person',personSchema);
module.exports=person;