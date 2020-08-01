const express=require('express');
const multer=require('multer');
const path=require('path');
const fs=require('fs')
const router=express.Router();
const Person=require('../models/person')
const Milestone=require('../models/milestone')
const {ensureAuthenticated}=require('../config/auth');
// const { cursorTo } = require('readline');
// const { isValidObjectId } = require('mongoose');
// const ObjectID = require('mongodb').ObjectID;
router.get('/',(req,res)=>{
    res.render('welcome');
})
router.get('/dashbord',ensureAuthenticated,(req,res)=>{
    res.render('dashbord',{
        name:req.user.name
    });
})
router.get('/person',ensureAuthenticated,(req,res)=>{
    res.render('addperson');
})


var Storage= multer.diskStorage({
    destination:"./assets/uploads/",
    filename:(req,file,cb)=>{
      cb(null,file.fieldname+"_"+Date.now()+path.extname(file.originalname));
    }
  });
  
  var pupload = multer({
    storage:Storage
  }).array('personphoto',12);
//   var pupload = multer({
//     storage:Storage
//   }).array('personphoto',12);
 router.get('/addmilestone',function(req,res){
     res.render('addmilestone')
 })
router.post('/addperson',pupload,(req,res)=>{
    Person.findOne({name:req.body.name},function(err,user){
        if(user){
            req.flash('error_msg','person already exist');
            console.log("user already exists")
            res.redirect('back');
            return;
        }
    
    if(!user){
    Person.create({
        name:req.body.name,
        homeaddress:req.body.homeaddress,
        workaddress:req.body.workaddress,
        work:req.body.work,
        phone1:req.body.phone1,
        phone2:req.body.phone2,
        phone3:req.body.phone3,
        witness1:req.body.witness1,
        witness2:req.body.witness2,
        witness3:req.body.witness3,
        adharcard:req.body.adharcard,
        cheque:req.body.cheque,
        // personphoto:req.file.filename,
        // witnessphoto:req.file.filename,
        location:req.body.location,
    },function(err,newPerson){
        if(err){
    
            console.log('error in creating a person');
            return;
        }
        req.flash('success_msg','new entry is created successfully!');
        console.log('********',newPerson);
        return res.redirect('addmilestone');
    })
    }
})
})
router.post('/addmilestone',ensureAuthenticated,function(req,res){
    Milestone.create({
        name:req.body.name,
        units:req.body.units,
        rate:req.body.rate,
        startdate:req.body.startdate,
        starttime:req.body.starttime,
        duedate:req.body.duedate,
        duetime:req.body.duetime,
        unitstobepaid:req.body.unitstobepaid

    },function(err,newMilestone){
        if(err){
            console.log("error in creating new milestone")
            return;
        }
        req.flash('success_msg','new entry is created successfully!');
        console.log('********',newMilestone);
        return res.redirect('back');
    })
})
router.get('/viewperson',ensureAuthenticated,function(req,res){
    Person.find({},function(err,persons){
        if(err){
            console.log('error in fetching the data');
            return;
        }
        return res.render('viewperson',{
            
            person_list:persons
        });
    })
    
})
router.get('/viewmilestone',ensureAuthenticated,function(req,res){
    Milestone.find({},function(err,milestones){
        if(err){
            console.log('error in fetching the data');
            return;
        }
        return res.render('viewmilestone',{
            
            milestone_list:milestones
        });
    })
})

router.get('/viewall',ensureAuthenticated,function(req,res){
    Person.aggregate([
        {
            $lookup:
            {
                from:"milestones",
                localField:"name",
                foreignField:"name",
                as:"user_details"
            }
        },
        {$unwind:"$user_details"}
        
    ]
    ).exec(function(err,results){
        if(err){
            console.log(err)
        }
        
        console.log(results)
        // res.send(results)
        return res.render('viewalluserdetails',{
            results_list:results
        })
    })
})
router.get('/milestone/edit/:id',(req,res)=>{
   Milestone.findById(req.params.id,function(err,milestone){
       res.render('edit',{
           milestone:milestone
       })
   })
})


router.post('/editmilestone/:id',ensureAuthenticated,function(req,res){
        
        Milestone.findOneAndUpdate({_id:req.body._id},req.body,{ new:true },function(err,milestone){
            
            if(err){
                console.log(err);
                return;
            }else{
                req.flash('success_msg','new update is created successfully!');
                console.log(milestone)
                return res.redirect("back")
            }
        })
        
    
})
module.exports=router;