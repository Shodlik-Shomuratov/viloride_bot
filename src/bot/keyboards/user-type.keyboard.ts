import { InlineKeyboard } from "grammy";
import { UserTypeEnum } from "../../server/types/user.type";

export const keyboard = new InlineKeyboard()
.text(`🚖 Haydovchi`, UserTypeEnum.DRIVER)
.text("👤 Yo'lovchi", UserTypeEnum.PASSENGER)