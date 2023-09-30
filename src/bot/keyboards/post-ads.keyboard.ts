import { Menu, MenuRange } from "@grammyjs/menu";
import { MyContext } from '../types'
import { districts as districtsArray, regions } from '../helpers/regions-districts';
import { adsConfirmationMessage, adsDateMessage, adsDepartureMessage, adsDestinationMessage, adsPassengerCountMessage, adsPassengerInformationMessage, adsTaxiFeeMessage } from "../helpers/messages.helper";
import { DateTime } from "../helpers";
import { ads } from "../helpers/ads";
import { AdsType, UserTypeEnum } from "../../server/types";
import { homeKeyboard } from ".";
import { bot } from "..";
import { getCustomUser } from "../../server/services/user.service";
import { addAds } from "../../server/services/ads.service";


export const keyboard = new Menu<MyContext>("post__ads__menu")
.dynamic(async (ctx) => {
   const range = new MenuRange<MyContext>();
   
   
   regions.forEach((region, index) => {
    range.submenu(region, "departure__district__menu", async (ctx) => {
        ctx.session.departureRegion = region;

        const msg = await adsDepartureMessage(ctx);
        ctx.editMessageText(msg);
    });

    if ((index + 1) % 2 === 0) {
        range.row();
    }
   });


   return range;
});


export const departureDistrictKeyboard = new Menu<MyContext>("departure__district__menu")
.dynamic(ctx => {
    const districts = districtsArray[regions.indexOf(ctx.session.departureRegion)];

    const range = new MenuRange<MyContext>();

    districts?.forEach((district, index) => {
        range.submenu(district, "destination__region__menu", async (ctx) => {
            ctx.session.departureDistrict = district;

            const msg = await adsDestinationMessage(ctx);
            ctx.editMessageText(msg);
        });


        if ((index + 1) % 2 === 0) {
            range.row();
        }
    });

    range.row();
    range.back("◀️ Orqaga", async (ctx) => {
        ctx.session.departureRegion = "";
        const msg = await adsDepartureMessage(ctx);
        ctx.editMessageText(msg);
    });

    return range;
});


export const destinationRegionKeyboard = new Menu<MyContext>("destination__region__menu")
.dynamic(ctx => {
    const range = new MenuRange<MyContext>();

    regions.forEach((region, index) => {
        range.submenu(region, "destination__district__menu", async (ctx) => {
            ctx.session.destinationRegion = region;

            const msg = await adsDestinationMessage(ctx);
            ctx.editMessageText(msg);
        });


        if ((index + 1) % 2 === 0) {
            range.row();
        }
    });

    range.row();
    range.back("◀️ Orqaga", async (ctx) => {
        ctx.session.departureDistrict = "";
        const msg = await adsDepartureMessage(ctx);
        ctx.editMessageText(msg);
    })

    return range;
});


export const destinationDistrictKeyboard = new Menu<MyContext>("destination__district__menu")
.dynamic(ctx => {
    const districts = districtsArray[regions.indexOf(ctx.session.destinationRegion)];

    const range = new MenuRange<MyContext>();

    districts?.forEach((district, index) => {
        range.submenu(district, "leaving__date__menu", async (ctx) => {
            ctx.session.destinationDistrict = district;

            const msg = await adsDateMessage(ctx);
            ctx.editMessageText(msg);
        });


        if ((index + 1) % 2 === 0) {
            range.row();
        }
    });

    range.row();
    range.back("◀️ Orqaga", async (ctx) => {
        ctx.session.destinationRegion = "";
        const msg = await adsDestinationMessage(ctx);
        ctx.editMessageText(msg);
    });

    return range;
});

export const leavingDateKeyboard = new Menu<MyContext>("leaving__date__menu")
.dynamic(async (ctx) => {
    if (!ctx.session.weekCounter) {
        ctx.session.weekCounter = 0;
    }

    const days = DateTime.getDateTime(ctx.session.weekCounter);
    const range = new MenuRange<MyContext>();

    
    const userTgId = ctx.from?.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });


    if (user.user_type === UserTypeEnum.DRIVER) {

        days.forEach(async ({day, month, year}: {
            day: number;
            month: string;
            year: number;
        }, index: number) => {
            const texture = `${month} ${day}, ${year}`;
    
            range.submenu(texture, "passenger__counter__menu", async (ctx) => {
                ctx.session.leavingDate = texture;
                const msg = await adsPassengerCountMessage(ctx);
                await ctx.editMessageText(msg);
            });
    
            if (index % 2 === 0) {
                range.row();
            }
        });

    } else {

        days.forEach(async ({day, month, year}: {
            day: number;
            month: string;
            year: number;
        }, index: number) => {
            const texture = `${month} ${day}, ${year}`;

            range.text(texture, async (ctx) => {
                ctx.session.leavingDate = texture;
                const msg = await adsPassengerInformationMessage(ctx)
                await ctx.editMessageText(msg);
                ctx.menu.close();
                await ctx.conversation.enter("postAdsConversation");
            });

    
            if (index % 2 === 0) {
                range.row();
            }
        });

    }
    

    range.row();
    range.text((ctx) => ctx.session.weekCounter <= 0 ? " " : "◀️ Oldingi",
    async (ctx) => {
        if (ctx.session.weekCounter <= 0) {
            return;
        }

        ctx.session.weekCounter--;
        ctx.menu.update();
    });


    range.text((ctx) => ctx.session.weekCounter >= 10 ? " " : "Keyingi ▶️",
    async (ctx) => {
        if (ctx.session.weekCounter >= 10) {
            return;
        }

        ctx.session.weekCounter++;
        ctx.menu.update();
    });
    range.row();


    range.back("◀️ Orqaga", async (ctx) => {
        ctx.session.destinationDistrict = "";
        const msg = await adsDestinationMessage(ctx);
        ctx.editMessageText(msg);
    });

    
    return range;
});


export const passengerCounterKeyboard = new Menu<MyContext>("passenger__counter__menu")
.dynamic(async (ctx) => {
    if (!ctx.session.passengerCount) {
        ctx.session.passengerCount = 1;
    }

    const range = new MenuRange<MyContext>();
    
    range.text((ctx) => ctx.session.passengerCount <= 1 ? " " : " - ",
    async (ctx) => {
        if (ctx.session.passengerCount <= 1) {
            return;
        }

        ctx.session.passengerCount--;
        ctx.menu.update();
    });
    range.text((ctx) => `${ctx.session.passengerCount}`);
    range.text((ctx) => ctx.session.passengerCount >= 50 ? " " : " + ",
    async (ctx) => {
        if (ctx.session.passengerCount >= 50) {
            return;
        }   

        ctx.session.passengerCount++;
        ctx.menu.update();
    });
    range.row();
    range.text("✅ Tasdiqlash", async (ctx) => {

        const msg = await adsTaxiFeeMessage(ctx);
        await ctx.editMessageText(msg);


        await ctx.menu.close({
            immediate: true
        });


        await ctx.conversation.enter("postAdsConversation");
    });
    range.row();
    range.back("◀️ Orqaga", async (ctx) => {
        ctx.session.leavingDate = "";
        const msg = await adsDateMessage(ctx);
        ctx.editMessageText(msg);
    })

    return range;
});


export const adsConfirmationKeyboard = new Menu<MyContext>("ads__confirmation__menu")
.dynamic(async (ctx) => {
    const range = new MenuRange<MyContext>();


    range.text("✅ Tasdiqlash", async (ctx) => {

        const readyAd: AdsType = {
            user_tg_id: ctx.from.id,
            departure_region: ctx.session.departureRegion,
            departure_district: ctx.session.departureDistrict,
            destination_region: ctx.session.destinationRegion,
            destination_district: ctx.session.destinationDistrict,
            leaving_date: ctx.session.leavingDate,
            passengers_count: ctx.session.passengerCount,
            taxi_fee: ctx.session.taxiFee,
            status: "searching"
        }


        addAds(readyAd)


        await ctx.reply("Sizning e\'loningiz muvaffaqiyatli joylandi 🎉", {
            reply_markup: {
                keyboard: homeKeyboard,
                resize_keyboard: true
            }
        });


        const msg = await adsConfirmationMessage(ctx);
        await bot.api.sendMessage("@viloride_chanel", msg);
    });
    range.row();
    range.text("🚫 Bekor qilish", async (ctx) => {
        
    });


    return range;
});