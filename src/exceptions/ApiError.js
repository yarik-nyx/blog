export class ApiError extends Error{
    status
    error
    constructor(status, message, errors = []){
        super(message)
        this.errors = errors
        this.status = status

    }

    static UnathorizedError(message='Пользователь не авторизован') {
        return new ApiError(401, message)
    } 

    static BadRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }  

    static NotFound(message) {
        return new ApiError(404, message)
    }  
}