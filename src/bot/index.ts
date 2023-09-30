import { Bot } from "grammy";
import { config } from "../utils";
import { MyContext } from './types';
import { adsListFeature, postAdsFeature, profileFeature, startFeature } from './features';
import { setupSessionMiddleware } from './middlewares';
import { handleError } from "./helpers";
import { conversations, createConversation } from "@grammyjs/conversations";
import { postAdsConversation, startConversation } from './conversations';
import { adsConfirmationKeyboard, adsListKeyboard, confirmationKeyboard, departureDistrictKeyboard, destinationDistrictKeyboard, destinationRegionKeyboard, leavingDateKeyboard, passengerCounterKeyboard, postAdsKeyboard } from "./keyboards";
import { apiThrottler } from "@grammyjs/transformer-throttler";
import { parseMode } from "@grammyjs/parse-mode";


// Initiate bot
export const bot = new Bot<MyContext>(config.BOT_TOKEN);


// Middlewares
bot.use(setupSessionMiddleware());
bot.api.config.use(apiThrottler());
bot.api.config.use(parseMode("HTML"));


// Keyboards
bot.use(adsConfirmationKeyboard);
bot.use(confirmationKeyboard);



// Conversations
bot.use(conversations());
bot.use(createConversation(startConversation));
bot.use(createConversation(postAdsConversation));


// Keyboards
postAdsKeyboard.register(departureDistrictKeyboard);
departureDistrictKeyboard.register(destinationRegionKeyboard);
destinationRegionKeyboard.register(destinationDistrictKeyboard);
destinationDistrictKeyboard.register(leavingDateKeyboard);
leavingDateKeyboard.register(passengerCounterKeyboard);
bot.use(postAdsKeyboard);
bot.use(departureDistrictKeyboard);
bot.use(leavingDateKeyboard);
bot.use(passengerCounterKeyboard);
bot.use(adsListKeyboard);


// Features
bot.use(startFeature);
bot.use(profileFeature);
bot.use(postAdsFeature);
bot.use(adsListFeature)


// Error handler
if (config.isDev) {
    bot.catch(handleError);
}