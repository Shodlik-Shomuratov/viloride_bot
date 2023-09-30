import { MyContext, MyConversation } from "../types";
import { confirmationKeyboard, contactKeyboard, homeKeyboard, userTypeKeyboard } from "../keyboards";
import { UserType, UserTypeEnum } from "../../server/types/user.type";
import { registrationMessage } from "../helpers/messages.helper";
import { addUser, getAllUsers } from "../../server/services/user.service";
import { context } from "../helpers";


export const startConversation = async (
    conversation: MyConversation,
    ctx: MyContext
) => {
    
    ctx.session.isConversation = true;


    await ctx.replyWithPhoto("https://i.pinimg.com/originals/e9/e2/78/e9e2787d0cb55d570fe1c76843506759.jpg", {
        caption: `Assalomu alaykum. Botga xush kelibsiz\n\n`+ 
        `Botdan to\'liq foydalanish uchun ro\'yxatdan o\'ting. Kim bo'lib ro'yxatdan o'tasiz`,
        reply_markup: userTypeKeyboard,
    });
    const callbackQueryContext = await conversation.waitForCallbackQuery([UserTypeEnum.DRIVER, UserTypeEnum.PASSENGER]);
    ctx.session.userType = callbackQueryContext.callbackQuery.data;


    await ctx.reply("👤 Ismingiz:", {
        reply_markup: {
            remove_keyboard: true
        }
    });
    ctx.session.firstName = await conversation.form.text();


    await ctx.reply("👤 Familiyangiz:", {
        reply_markup: {
            remove_keyboard: true
        }
    });
    ctx.session.lastName = await conversation.form.text();


    await ctx.reply("☎️ Telefon raqamingiz:", {
        reply_markup: {
            keyboard: contactKeyboard,
            resize_keyboard: true,
        }
    });
    const contactContext = await conversation.waitFor(":contact");
    ctx.session.phoneNumber = contactContext.message?.contact.phone_number;
    ctx.session.userTgUsername = `@${ctx.from?.username}`;

    
    if (ctx.session.userType === UserTypeEnum.DRIVER) {
        await ctx.reply("🚖 Mashinangiz turi (Masalan: Cobalt):", {
            reply_markup: {
                remove_keyboard: true
            }
        });
        ctx.session.carModel = await conversation.form.text();


        await ctx.reply("🔢 Mashinangiz raqamini kiriting (Masalan: 00 A 000 AA): ", {
            reply_markup: {
                remove_keyboard: true
            }
        });
        ctx.session.carNumber = await conversation.form.text();
    }

    const user: UserType = {
        user_type: ctx.session.userType,
        user_tg_id: ctx.from?.id,
        user_tg_username: ctx.session.userTgUsername,
        first_name: ctx.session.firstName,
        last_name: ctx.session.lastName,
        phone_number: ctx.session.phoneNumber,
        car_model: ctx.session.carModel,
        car_number: ctx.session.carNumber
    };
    await addUser(user);


    const msg = registrationMessage(ctx);
    await ctx.reply(msg, {
        reply_markup: {
            keyboard: homeKeyboard,
            resize_keyboard: true
        }
    });
    await ctx.reply("Tabriklaymiz siz muvaffaqiyatli ro'yxatdan o'tdingiz 🎉");

    
    ctx.session.isConversation = false;
}