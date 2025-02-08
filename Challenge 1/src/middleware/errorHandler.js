exports.errorHandler = (error, req, res, next) => {
  return res.status(error.statusCode || 500).json({
    status: error.status || "error",
    message: error.message || "Something went wrong please try again ",
  });
};
