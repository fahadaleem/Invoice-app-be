const handleServerError = (err, req, res, next) => {
  res
    .status(err.code || 500)
    .json({ status: "error", message: err.message || "Internal server error" });
};

module.exports = handleServerError;
