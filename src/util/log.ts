import * as winston from "winston";

const fmt = winston.format;

const logger = winston.createLogger({
    level: 'verbose',
    format: fmt.combine(
        fmt.timestamp(),
        fmt.label({label: "TODO"}),
        fmt.cli(),
        fmt.printf(info => {
            return `${info.timestamp} [${info.label}|${info.level}]: ${info.message}`
        })
    ), 
    transports: [
        new winston.transports.Console(),
        
    ]
});

export default logger;