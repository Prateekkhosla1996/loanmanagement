const mongoose=require('mongoose');
const milestoneSchema=new mongoose.Schema({

    name:{
        type:String,
       
    },
    units:{
        type: Number,
       
    },
    rate:{
        type:Number,
        
    },
    startdate:{
        type:Date,
      
    },
    starttime:{
        type:String,
        
    },
    duedate:{
        type:Date,
        
    },
    duetime:{
        type:String,
       
    },
    unitstobepaid:{
        type:Number,
        
    },
    time:{
        type:String
    }
    ,
    
});
const milestone=mongoose.model('milestone',milestoneSchema);
module.exports=milestone;