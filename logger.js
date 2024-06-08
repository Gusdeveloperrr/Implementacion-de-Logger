const { createLogger, format, transports, addColors } = require('winston');
const { combine, timestamp, printf } = format;

const logFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
});

const customLevels = {
    levels: {
        fatal: 0,
        error: 1,
        warn: 2,
        info: 3,
        http: 4,
        debug: 5
    },
    colors: {
        fatal: 'red',
        error: 'red',
        warn: 'yellow',
        info: 'green',
        http: 'magenta',
        debug: 'blue'
    }
};

addColors(customLevels.colors);

const devLogger = createLogger({
    levels: customLevels.levels,
    level: 'debug',
    format: combine(
        timestamp(),
        format.colorize(),
        logFormat
    ),
    transports: [
        new transports.Console()
    ]
});

const prodLogger = createLogger({
    levels: customLevels.levels,
    level: 'info',
    format: combine(
        timestamp(),
        logFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'errors.log', level: 'error' })
    ]
});

const logger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

logger.info('Logger configurado correctamente');

module.exports = logger;
