const errorHandler = (err, req, res, next) => {
  const match = err.message.includes("E11000");
  if (match) {
    res.status(500).json({
      status: false,
      code: err.statusCode ?? 500,
      message: "Already exists",
    });
  }
  res.status(500).json({
    status: false,
    code: err.statusCode ?? 500,
    message: err.message || "Server Error",
  });
};
module.exports = errorHandler;
