import * as winston from "winston";
import {confLog} from './conf';

const loggerCache:Map<string,winston.Logger> = new Map<string,winston.Logger>();
const fmt = winston.format;


function get(name: string): winston.Logger {
    const cache = loggerCache.get(name);
    if(cache) {
        return cache;
    }

    const logger = winston.createLogger({
        level: confLog.level,
        format: fmt.combine(
            fmt.timestamp({format: "YYYY/MM/DD-HH:mm:ss.SSSZZ"}),
            fmt.label({label: name}),
            fmt.simple(),
            fmt.printf((info:winston.Logform.TransformableInfo) => {
                return `${info.timestamp as number} [${(info.label as string).toUpperCase()}|${info.level.toUpperCase()}]: ${info.message}`
            })
        ), 
        transports: [
            new winston.transports.Console()
        ]
    });
    if(confLog.fileOut) {
        logger.add(
            new winston.transports.File({
                eol: '\n',
                filename: confLog.fileName,
                maxsize: confLog.maxSize,
                maxFiles: confLog.maxFiles
            })
        );
    }
    loggerCache.set(name, logger);
    return logger;
}


export default get;