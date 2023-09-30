import { AsyncLocalStorage } from "async_hooks";
import { Logger } from "pino";


export interface LocalContext {
    logger?: Logger
}

export const context = new AsyncLocalStorage<LocalContext>()