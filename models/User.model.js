const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase:true,
    },
    Name:{
        required:true,
        type:String,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps : true});

const User = mongoose.model('User',UserSchema);




module.exports(User);