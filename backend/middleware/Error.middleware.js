
export const errorMiddleware = (err, req, res, next) => {
     err.statusCode = err.statusCode || 500;
     err.message = err.message || "Internal Server Error";

     if(err.name == "CastError"){
        err.message = `Resource not found. Invalid ${err.value}`;
        err.statusCode = 400;
     }

     if(err.code == 11000){
        err.message = "Resource already exists";
        err.statusCode = 400;
     }

     if(err.name == "ValidationError"){
        err.message = Object.values(err.errors).map(value => value.message).join(", ");
        err.statusCode = 400;
     }

     res.status(err.statusCode).json({
        success:false,
        message:err.message,
     })
}
