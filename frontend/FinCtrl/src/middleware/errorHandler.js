const errorHandler = (error, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: error.message || "Something went wrong",
    ...(process.env.NODE_ENV !== "production" ? { stack: error.stack } : {}),
  });
};

export default errorHandler;
