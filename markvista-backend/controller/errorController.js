import AppError from "../utils/appError.js";

const castErrorHanlderDB = (err) =>
  new AppError(`Invalid ${err.path}: ${err.value}`, 400);

const duplicateErrorHanlderDB = (err) => {
  const [key] = Object.keys(err.keyValue);

  return new AppError(`${err.keyValue[key]} already exist`, 400);
};
const handleJWTError = () =>
  new AppError("Invalid Token please login Again!!", 401);

const handleTokenExpireError = () =>
  new AppError("Login Session Expired Please Login Again!!", 401);

const validationErrorHanlderDB = (err) => {
  const message = Object.values(err.errors).map((error) => error.message);
  return new AppError(message.join(". "), 400);
};
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    errorStack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operation Error: send message to client

  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // Programmetical or unknown error don't leak info to client
  else {
    // console.error('error: ', err);

    console.log("Error in not Operational");

    console.log(err);

    if (err.message === "Every user must have unique email")
      return res.status(400).json({
        status: "fail",
        message: "Email already exists",
      });

    return res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

function globalErrorHandler(err, req, res, next) {
  console.log("Global Error");

  console.log(err);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };
    error.message = err.message;
    if (err.name === "CastError") error = castErrorHanlderDB(error);
    if (err.name === "ValidationError") error = validationErrorHanlderDB(error);
    if (err.code === 11000) error = duplicateErrorHanlderDB(error);
    if (err.name === "JsonWebTokenError") error = handleJWTError();
    if (err.name === "TokenExpiredError") error = handleTokenExpireError();

    // console.log(error);
    // console.log(err);

    sendErrorProd(error, res);
  }
  next();
}

export default globalErrorHandler;
