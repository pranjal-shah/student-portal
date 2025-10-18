import logger from "../utils/logger/logger.js";

const errorMiddleware = (err, req, res, next) => {
  logger.error(
    `${req.method} ${req.originalUrl} - ${err.statusCode} ${err.message}`
  );
  return res
    .status(err.statusCode)
    .json({ error: true, message: err.message, errors: err.errors });

};

export default errorMiddleware;
