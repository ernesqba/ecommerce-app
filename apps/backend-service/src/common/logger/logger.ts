import winston, { Logform, LoggerOptions } from 'winston'

const alignColorsAndTime: Logform.Format = winston.format.combine(
  winston.format.colorize({
    all: true,
  }),
  winston.format.label({
    label: '[LOGGER]',
  }),
  winston.format.timestamp({
    format: 'YY-MM-DD HH:mm:ss',
  }),
  winston.format.printf((info) => ` ${info.label}  ${info.timestamp}  ${info.level} : ${info.message}`),
)

const myWinstonOptions: LoggerOptions = {
  level: 'debug',
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), alignColorsAndTime),
    }),
  ],
}

const logger = winston.createLogger(myWinstonOptions)

export = logger
