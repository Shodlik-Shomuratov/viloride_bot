import { Composer } from "grammy";
import { MyContext } from "../types";
import { homeKeyboard } from '../keyboards';
import { bot } from "..";
import { getCustomUser } from "../../server/services/user.service";
import { UserType } from "../../server/types/user.type";


export const composer = new Composer<MyContext>();
const feature = composer.chatType("private");


feature.command("start", async (ctx) => {
    await bot.api.setMyCommands([
        {
            command: "start",
            description: "Botni ishga tushirish"
        }
    ]);


    if (ctx.session.isConversation) {
        return;
    }

    const userTgId = ctx.from.id;
    const user: UserType = await getCustomUser({
        user_tg_id: userTgId
    });
    

    if (user) {
        const { first_name: firstName, last_name: lastName } = user;


        await ctx.replyWithPhoto("https://i.pinimg.com/originals/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg", {
            caption: `Assalomu alaykum <b>${firstName} ${lastName}</b>. Botga xush kelibsiz\n\n`+ 
            `/start - Botni ishga tushirish\n\n` + 
            `Pastdagi menyu orqali botdan to'laqonli foydalanishingiz mumkin 👇`,
            reply_markup: {
                keyboard: homeKeyboard,
                resize_keyboard: true
            }
        });

        
        return;
    } else {
        await ctx.conversation.enter("startConversation");
    }
});