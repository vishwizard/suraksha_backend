const User = require('../models/User.model');
const asyncHandler = require('../utils/asyncHandler.utils');
const z = require('zod');
const ApiError = require('../utils/ApiError.utils');
const ApiResponse = require('../utils/ApiResponse.utils');

const userSchema = z.object({
    username:z.string(),
    password:z.string().min(8),
    name:z.string(),
    email:z.email()
});

const registerUser = asyncHandler(async (req, res)=>{
    const {username, password, email, name} = req.body;

    const parsedData = userSchema.safeParse({username,password,name,email});
    if(!parsedData.success){
        throw new ApiError(400,{},"Invalid Details");
    }

    if(User.findOne(username) || User.findOne(email)) {
        throw new ApiError(400,{},"A user with same username or email exists");
    }

    const user = new User({username,email,password,name});
    await user.save();
    return new ApiResponse.respond(res,201,{},"User Registered Successfully");
});

module.exports = registerUser;