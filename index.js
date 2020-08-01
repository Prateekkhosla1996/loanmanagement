const express=require('express');
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
const flash=require('connect-flash');
const session=require('express-session')
const passport=require('passport')
const multer=require('multer');
const methodOverride=require('method-override')
const app=express();

//passport config
require('./config/passport')(passport);
const db=require('./config/mongoose');
// const passport = require('./config/passport');

app.use(express.static('assets'));
app.use(expressLayouts);
app.set('view engine','ejs')
app.use(methodOverride('_method'))
//bodyparser
app.use(express.urlencoded({extended:false}))
//Express Session
app.use(session({
    secret:'somthing',
    saveUninitialized:true,
    resave:true
    }))
    //passport middleware
    app.use(passport.initialize());
    app.use(passport.session());
    //connect flash
    app.use(flash());

    //global vars
    app.use((req,res,next)=>{
        res.locals.success_msg=req.flash('success_msg');
        res.locals.error_msg=req.flash('error_msg');
        res.locals.error=req.flash('error');
        next();
    })

//routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/users'))
const port=process.env.port||8000;
app.listen(port,console.log(`server is running on port ${port}`));