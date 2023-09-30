import { Composer } from "grammy";
import { MyContext } from "../types";
import { users } from '../helpers/users';
import { profileMessage } from "../helpers/messages.helper";
import { homeKeyboard } from '../keyboards'
import { getCustomUser } from "../../server/services/user.service";


export const composer = new Composer<MyContext>();
const feature = composer.chatType("private");

feature.hears("👤 Mening ma'lumotlarim", async (ctx) => {
    if (ctx.session.isConversation) {
        return;
    }
    

    const userTgId = ctx.from.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });


    if (!user) {
        await ctx.reply("Siz hali ro'yxatdan o'tmagansiz 😥");

        return;
    }

    
    const msg = profileMessage(user);
    await ctx.reply(msg, {
        reply_markup: {
            keyboard: homeKeyboard,
            resize_keyboard: true
        }
    });
});