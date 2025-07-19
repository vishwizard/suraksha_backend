const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError.utils');

const secret = process.env.jwt_secret;

const generateJWT = (payload)=>{
    return jwt.sign(payload,secret,{expiresIn:'48h'});
}

const verifyJWT = (token)=>{
    try {
        return jwt.verify(token,secret);
    } catch (error) {
        throw new ApiError(403,{},"Invalid Token");
    }
}

module.exports = {generateJWT, verifyJWT};