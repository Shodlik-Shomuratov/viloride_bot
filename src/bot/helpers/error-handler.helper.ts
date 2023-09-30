import { BotError } from "grammy";
import { MyContext } from "../types";
import { logger } from "../../utils";

export const handleError = (error: BotError<MyContext>) => {
  const { ctx } = error;
  const err = error.error;

  logger.error({
    update_id: ctx.update.update_id,
    err,
  });
};