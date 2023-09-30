import { ConversationFlavor } from "@grammyjs/conversations";
import { ParseModeFlavor } from "@grammyjs/parse-mode";
import { Context, SessionFlavor } from "grammy";
import { LocalContext } from "../helpers";
import { SessionData } from "./";


export interface LocalContextFlavor {
    local: LocalContext;
}


export type MyContext = ParseModeFlavor<
    Context &
    ConversationFlavor &
    SessionFlavor<SessionData> &
    LocalContextFlavor
>