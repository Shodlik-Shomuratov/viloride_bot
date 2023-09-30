import "dotenv/config";
import { cleanEnv, num, str } from "envalid";


export const config = cleanEnv(process.env, {
    NODE_ENV: str({
        choices: ["development", "production"]
    }),
    BOT_TOKEN: str(),
    LOG_LEVEL: str({
        choices: ["trace", "debug", "info", "warn", "error", "fatal", "silent"]
    }),
    DB_HOST: str(),
    DB_PORT: num(),
    DB_USER: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),

});