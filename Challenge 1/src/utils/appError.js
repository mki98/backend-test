class AppError extends Error {
  constructor(status, message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = status;
  }
}
module.exports = AppError;
