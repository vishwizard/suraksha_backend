const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

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

UserSchema.pre('save', function (next){
    if(!this.isModified('password')) return next();
    bcrypt.hash(this.password,saltRounds, (err, hash)=>{
        if(err) return next(err);
        this.password = hash;
        next();
    })
});

UserSchema.methods.ComparePass = function (password){
    return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User',UserSchema);

module.exports = User;