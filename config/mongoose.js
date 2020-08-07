const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI ||'mongodb://localhost/taskmanagerdevelopment');

const db=mongoose.connection;

db.on('error',console.error.bind(console,"error connecting to mogodb"));

db.once('open',function(){
    console.log('connected to database::mongodb');
});

module.exports=db;