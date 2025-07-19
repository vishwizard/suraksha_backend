const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler.utils');
const z = require('zod');
const ApiError = require('../utils/ApiError.utils');
const ApiResponse = require('../utils/ApiResponse.utils');
const { generateJWT } = require('../config/jwt.config');

const registerSchema = z.object({
    username:z.string(),
    password:z.string().min(8),
    name:z.string(),
    email:z.email()
});

const loginSchema = z.object({
    loginId:z.string(),
    password:z.string().min(8)
})

const registerUser = asyncHandler(async (req, res)=>{
    console.log("Request : ",req.body);
    const parsedData = registerSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log(parsedData);
        throw new ApiError(400,{},"Invalid Details");
    }
    const {username,password,email,name} = parsedData.data;

    const existingUser = await User.findOne({
        $or: [{username},{email}]
    });

    if(existingUser) {
        throw new ApiError(400,{},"A user with same username or email exists");
    }

    const user = new User({username,email,password,name});
    await user.save();
    return ApiResponse.send(res,201,"User Registered");
});


const loginUser = asyncHandler(async (req,res)=>{
    const parsedData = loginSchema.safeParse(req.body);
    if(!parsedData.success){
        throw new ApiError(400,{},"Invalid Details");
    }
    const {loginId, password} = parsedData.data;
    const user = await User.findOne({
        $or:[{username : loginId},{email : loginId}]
    });

    if(!user){
        throw new ApiError(401,{},"No user exists with this username or email");
    }
    const match = await user.comparePass(password);
    if(!match){
        throw new ApiError(401,{},"Incorrect Password");
    }

    const token = generateJWT({loginId});
    return ApiResponse.respond(res,200,{token},"Login Successful");
})




module.exports = {registerUser,loginUser};