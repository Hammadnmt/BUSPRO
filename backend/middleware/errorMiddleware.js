const errorHandler = (err, req, res, next) => {
  res.status(599).json({
    status: false,
    code: err.statusCode ?? 500,
    message: err.message || "Server Error",
  });
};
module.exports = errorHandler;
