import { createLogger, format, transports, Logger } from 'winston';

const logger: Logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console({
            format: format.simple(),
        }),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ],
});

export const logInfo = (message: string): void => {
    logger.info(message);
};

export const logError = (message: string): void => {
    logger.error(message);
};

export const logDebug = (message: string): void => {
    logger.debug(message);
};