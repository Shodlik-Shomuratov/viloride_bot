import pino, {
    type DestinationStream,
    type Logger,
    type LoggerOptions,
} from "pino";
import { config } from "./config";
import { context } from "../bot/helpers";

  
const options: LoggerOptions = {
    level: config.LOG_LEVEL,
};
  

const transport = pino.transport({
    targets: [
      {
        target: "pino-pretty",
        level: config.LOG_LEVEL,
        options: {
          ...(config.isDev && {
            ignore: "pid,hostname",
            colorize: true,
            translateTime: true,
          }),
        },
      },
    ],
}) as DestinationStream;

  
export const rawLogger = pino(options, transport);
export const logger: Logger = new Proxy(rawLogger, {
    get(target, property, receiver) {
      target = context.getStore()?.logger || target;
      return Reflect.get(target, property, receiver);
    },
});