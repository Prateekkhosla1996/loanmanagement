const express=require('express');

const router=express.Router();
const bcrypt=require('bcryptjs');
const passport=require('passport')
const User=require('../models/User')
router.get('/login',(req,res)=>{
    res.render('login');
})
router.get('/register',(req,res)=>{
    res.render('register');
})
//register handle
router.post('/register',(req,res)=>{
  const{name,email,password,password2}=req.body;
  let errors=[];
  //check required fields
  if(!name||!email||!password||!password2){
    errors.push({msg:'please fill in all fields'})
  }
  if(password!==password2){
    errors.push({msg:'password do not match'})
  }
  if(password.length<6){
    errors.push({msg:'Password should be at least 6 characters'})
  }
  if(errors.length>0){
    res.render('register',{
        errors,
        name,
        email,
        password,
        password2
    })
  }else{
      //validation passed
    User.findOne({email:email})
    .then(user=>{
        if(user){
            errors.push({msg:"Email is alredy registered"})
            res.render('register',{
                errors:errors,
                name:name,
                email:email,
                password:password,
                password2:password2
            })
        }else{
            const newUser=new User({
                name:name,
                email:email,
                password:password
            })
            // console.log(newUser)
            // res.send('hello')
            //hash password

            bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err){
                  throw err;
                }
                newUser.password=hash;
                newUser.save()
                .then(
                  user=>{
                    req.flash('success_msg','You are now registered and can log in');
                    res.redirect('login')
                  }
                )
                .catch(err=>console.log(err));
              })
            })
        }
    })
  }
})

//login handle
router.post('/login',(req,res,next)=>{
  passport.authenticate('local',{
    successRedirect:'/dashbord',
    failureRedirect:'/users/login',
    failureFlash:true
  })(req,res,next);
})

//logout handle
router.get('/logout',(req,res)=>{
  req.logout();
  req.flash('success_msg','you are logged out');
  res.redirect('/users/login')
})
module.exports=router;