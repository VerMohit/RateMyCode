

class CustomeError extends Error {
    statusCode: number;

    constructor(errMssg: string = 'Custom Error', errName: string = "CustomError", statusCode:number = 500) {
        super(errMssg);
        this.name = errName;
        this.statusCode = statusCode;

        Error.captureStackTrace(this, this.constructor);
    }
}

class ConflictError extends CustomeError {
    constructor(errMssg: string = 'Conflict error in query', errName: string = "ConflictError") {
        super(errMssg, errName, 409);
    }
}

class ValidationError extends CustomeError {
    constructor(errMssg: string = 'Validation error in query', errName: string = "ValidationError") {
        super(errMssg, errName, 400);
    }
}

class NotFoundError extends CustomeError {
    constructor(errMssg: string = 'Not found error', errName: string = "NotFoundError") {
        super(errMssg, errName, 404);
    }
}

class DatabaseError extends CustomeError {
    constructor(errMssg: string = 'Database error', errName: string = "DatabaseError") {
        super(errMssg, errName, 500);
    }
}

export {CustomeError, ConflictError, ValidationError, NotFoundError, DatabaseError}