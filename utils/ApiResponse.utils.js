class ApiResponse {

    static respond = (res, code, data, message) => {
        return res.status(code).json({ ...data, message});
    }

    static send = (res,code,message)=>{
        return res.status(code).send(message);
    }
}



module.exports = ApiResponse;