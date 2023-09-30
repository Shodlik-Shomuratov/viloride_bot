import { MyContext, MyConversation } from "../types";
import { adsConfirmationMessage } from "../helpers/messages.helper";
import { adsConfirmationKeyboard } from "../keyboards";
import { getCustomUser } from "../../server/services/user.service";
import { UserTypeEnum } from "../../server/types";


export const postAdsConversation = async (
    conversation: MyConversation,
    ctx: MyContext
) => {
    conversation.session.isConversation = true;


    const userTgId = ctx.from?.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });


    if (user.user_type === UserTypeEnum.DRIVER) {
        const taxiFee = await conversation.waitFor(":text");
        ctx.session.taxiFee = taxiFee.message?.text;
    } else {
        const passengerInformation = await conversation.waitFor(":text");
        ctx.session.passengerInformation = passengerInformation.message?.text;
    }


    const msg = await adsConfirmationMessage(ctx);
    await ctx.editMessageText(msg);
    await ctx.editMessageReplyMarkup({
        reply_markup: adsConfirmationKeyboard
    });
    

    conversation.session.isConversation = false;
}