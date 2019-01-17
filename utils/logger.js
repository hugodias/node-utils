/**
 * @requires winston
 */
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [new winston.transports.Console({ level: "info" })]
});

export default logger;
