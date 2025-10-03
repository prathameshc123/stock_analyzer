// middlewares/errorMiddleware.js
import ApiError from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      success: false,
      statusCode: err.statusCode,
      message: err.message,
    });
  }

  // fallback for unexpected errors
  res.status(500).json({
    success: false,
    statusCode: 500,
    message: "Internal Server Error",
  });
};

export default errorHandler;
