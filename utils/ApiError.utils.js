class ApiError extends Error {
    constructor(statusCode=500,  data, message='500 : Internal Server Error', errors=[]){
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.errors = errors;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = ApiError;