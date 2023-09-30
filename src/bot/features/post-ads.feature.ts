import { Composer } from "grammy";
import { MyContext } from "../types";
import { adsDepartureMessage } from "../helpers/messages.helper";
import { cancelAdsKeyboard, postAdsKeyboard } from "../keyboards";


export const composer = new Composer<MyContext>();
const feature = composer.chatType("private");


feature.hears("📥 E'lon joylash", async (ctx) => {
    if (ctx.session.isConversation) {
        return;
    }

    ctx.reply("Quyidagi ma'lumotlarni kiriting 👇", {
        reply_markup: {
            remove_keyboard: true
        }
    })

    const msg = await adsDepartureMessage(ctx);
    await ctx.reply(msg, {
        reply_markup: postAdsKeyboard
    });
});