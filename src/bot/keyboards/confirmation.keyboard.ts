import { Menu } from "@grammyjs/menu";
import { MyContext } from "../types";
import { homeKeyboard } from ".";
import { addUser } from "../../server/services/user.service";


export const keyboard = new Menu<MyContext>("confirmation__menu")
.text("✅ Tasdiqlash", async (ctx) => {
    

    await ctx.reply("Tabriklaymiz siz muvaffaqiyatli ro'yxatdan o'tdingiz 🎉", {
        reply_markup: {
            keyboard: homeKeyboard,
            resize_keyboard: true
        }
    });

    ctx.menu.close();
});