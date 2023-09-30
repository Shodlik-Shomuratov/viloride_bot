import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from "../types";
import { ads } from "../helpers/ads";
import { adsListMessage } from "../helpers/messages.helper";
import { getCustomUser } from "../../server/services/user.service";
import { getCustomAds, getOneCustomAds, updateAds } from "../../server/services/ads.service";
import { AdsType } from "../../server/types";


export const keyboard = new Menu<MyContext>("ads__list__menu")
.dynamic(async (ctx) => {
    const userTgId = ctx.from?.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });
    const userAds = await getCustomAds({
        user_tg_id: userTgId
    });

    const range = new MenuRange<MyContext>();


    const currentAds = userAds[ctx.session.currentAdsId]; 
    range.text((ctx) => currentAds.status == "went" ? " " : "🔴 Ketdim",
    async (ctx) => {
        if (currentAds.status == "went") {
            return 
        }


        const updatedAds: AdsType = await updateAds(currentAds.id, {
            status: "went"
        });


        const msg = await adsListMessage(updatedAds, user.user_type);
        ctx.editMessageText(msg);
    })
    range.row();


    range.text((ctx) => ctx.session.currentAdsId <= 0 ? " " : " ◀️ ",
    async (ctx) => {
        if (ctx.session.currentAdsId <= 0) {
            return;
        }

        
        ctx.session.currentAdsId--;
        ctx.menu.update();


        const previousAds = await userAds[ctx.session.currentAdsId];
        const msg = await adsListMessage(previousAds, user.user_type);
        ctx.editMessageText(msg);
    });


    range.text(`${ctx.session.currentAdsId + 1} / ${ctx.session.adsCount + 1}`);
    
    
    range.text((ctx) => ctx.session.currentAdsId >= ctx.session.adsCount ? " " : " ▶️ ",
    async (ctx) => {
        if (ctx.session.currentAdsId >= ctx.session.adsCount) {
            return;
        }


        ctx.session.currentAdsId++;
        ctx.menu.update();

        
        const nextAds = userAds[ctx.session.currentAdsId];
        const msg = await adsListMessage(nextAds, user.user_type);
        ctx.editMessageText(msg);
    });

    return range;
});