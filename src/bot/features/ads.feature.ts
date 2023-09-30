import { Composer } from "grammy";
import { MyContext } from "../types";
import { adsListMessage } from "../helpers/messages.helper";
import { adsListKeyboard, homeKeyboard } from "../keyboards";
import { getCustomUser } from "../../server/services/user.service";
import { getCustomAds } from "../../server/services/ads.service";


export const composer = new Composer<MyContext>();
const feature = composer.chatType("private");


feature.hears("📣 E'lonlarim", async (ctx) => {
    const userTgId = ctx.from.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });
    const userAds = await getCustomAds({
        user_tg_id: userTgId
    });


    if (!userAds.length) {
        const msg = `<b> E\'lon</b>\n\n` +
        `Sizda e'lonlar mavjud emas 📂`;
        await ctx.reply(msg, {
            reply_markup: {
                keyboard: homeKeyboard,
                resize_keyboard: true
            }
        });
    } else {
        ctx.session.currentAdsId = 0;
        ctx.session.adsCount = userAds.length - 1;
        const msg = await adsListMessage(userAds[ctx.session.currentAdsId], user.user_type);
        await ctx.reply(msg, {
            reply_markup: adsListKeyboard
        });
    }    
});