class ApiResponse {

    static respond = (res, statusCode, data, message) => {
        return res.status(statusCode).json({ ...data });
    }
}



module.exports = ApiResponse;