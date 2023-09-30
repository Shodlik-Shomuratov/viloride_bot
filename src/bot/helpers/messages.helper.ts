import { getCustomUser } from "../../server/services/user.service";
import { AdsType } from "../../server/types";
import { UserType, UserTypeEnum } from "../../server/types/user.type";
import { MyContext } from "../types"
import { DateTime } from "./date-time.helper";



export const registrationMessage = (ctx: MyContext) => {
    let msg: string;


    if (ctx.session.userType === UserTypeEnum.DRIVER) {

        msg = `<b>Yangi haydovchi</b>\n\n` +
        `👤 <b>Ism familiyasi</b> - ${ctx.session.firstName} ${ctx.session.lastName}\n` +
        `☎️ <b>Telefon raqami</b> - ${ctx.session.phoneNumber}\n` +
        `🤖 <b>Username</b> - ${ctx.session.userTgUsername}\n` +
        `🚖 <b>Foydalanuvchi</b> - Haydovchi\n` +
        `🚗 <b>Mashina turi</b> - ${ctx.session.carModel}\n` +
        `🔢 <b>Mashina raqami</b> - ${ctx.session.carNumber}\n`;

    } else {

        msg = `<b>Yangi yo\'lovchi</b>\n\n` +
        `👤 <b>Ism familiyasi</b> - ${ctx.session.firstName} ${ctx.session.lastName}\n` +
        `☎️ <b>Telefon raqami</b> - ${ctx.session.phoneNumber}\n` +
        `🤖 <b>Username</b> - ${ctx.session.userTgUsername}\n` +
        `👤 <b>Foydalanuvchi turi</b> - Yo'lovchi\n`;

    }

    
    return msg;
}



export const profileMessage = (user: UserType) => {
    let msg: string;


    if (user.user_type === UserTypeEnum.DRIVER) {

        msg = `<b>Profil ma'lumotlari:</b>\n\n` + 
        `👤 <b>Ism familiyasi</b> - ${user.first_name} ${user.last_name}\n` +
        `☎️ <b>Telefon raqami</b> - ${user.phone_number}\n` +
        `🤖 <b>Username</b> - ${user.user_tg_username}\n` +
        `🚖 <b>Foydalanuvchi turi</b> - Haydovchi\n` +
        `🚗 <b>Mashina turi</b> - ${user.car_model}\n` +
        `🔢 <b>Mashina raqami</b> - ${user.car_number}\n`;

    } else {

        msg = `<b>Profil ma'lumotlari:</b>\n\n` +
        `👤 <b>Ism familiyasi</b> - ${user.first_name} ${user.last_name}\n` +
        `☎️ <b>Telefon raqami</b> - ${user.phone_number}\n` +
        `🤖 <b>Username</b> - ${user.user_tg_username}\n` +
        `👤 <b>Foydalanuvchi turi</b> - Yo'lovchi\n`;

    }


    return msg;
}



export const adsDepartureMessage = async (ctx: MyContext) => {
    return `🚩 <b>Qayerdan</b> - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n`;
}



export const adsDestinationMessage = async (ctx: MyContext) => {
    return `🚩 Qayerdan - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n\n` + 
    `🏁 <b>Qayerga</b> - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}`;
} 



export const adsDateMessage = async (ctx: MyContext) => {
    return `🚩 Qayerdan - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` + 
    `🏁 Qayerga - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n\n` +
    `📅 <b>Qachon</b> - ${ctx.session.leavingDate || ""}`;
}



export const adsPassengerCountMessage = async (ctx: MyContext) => {
    return `🚩 Qayerdan - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` + 
    `🏁 Qayerga - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n` +
    `📅 Qachon - ${ctx.session.leavingDate || ""}\n\n` + 
    `👥 <b>Yo\'lovchilar soni</b> - ${ctx.session.passengerCount > 1 ? ctx.session.passengerCount + " ta" : "" }`;
}



export const adsTaxiFeeMessage = async (ctx: MyContext) => {
    return `🚩 Qayerdan - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` + 
    `🏁 Qayerga - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n` +
    `📅 Qachon - ${ctx.session.leavingDate || ""}\n` + 
    `👥 Yo\'lovchilar soni - ${ctx.session.passengerCount ? ctx.session.passengerCount + " ta" : "" }\n\n` +
    `💸 <b>Narxi (Masalan: 100ming so\'m)</b> - ${ctx.session.taxiFee || ""}`;
}



export const adsPassengerInformationMessage = async (ctx: MyContext) => {
    return `🚩 Qayerdan - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` + 
    `🏁 Qayerga - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n` +
    `📅 Qachon - ${ctx.session.leavingDate || ""}\n\n` + 
    `📝 <b>Izoh (Masalan: Oldindan joy kerak!)</b> - ${ctx.session.passengerCount > 1 ? ctx.session.passengerCount + " ta" : "" }`;
}



export const adsConfirmationMessage = async (ctx: MyContext) => {
    const userTgId = ctx.from?.id;
    const user = await getCustomUser({
        user_tg_id: userTgId
    });
    let msg: string;

    // console.log(ctx.session);

    if (user.user_type === UserTypeEnum.DRIVER) {
        
        msg = `<b>Haydovchi</b> 📣\n` + 
        `#haydovchi\n\n` +
        `🚩 <b>Qayerdan</b> - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` +
        `🏁 <b>Qayerga</b> - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n` +
        `📅 <b>Qachon</b> - ${ctx.session.leavingDate}\n` +
        `👥 <b>Yo'lovchilar soni</b> - ${ctx.session.passengerCount} ta\n` +
        `💸 <b>Narxi</b> - ${ctx.session.taxiFee}\n\n` +
        `<b>E'lon joyladi:</b>\n` +
        `<b>Haydovchi</b> - ${user?.first_name} ${user?.last_name}\n` + 
        `<b>Telefon raqami</b> - ${user?.phone_number}\n` + 
        `<b>Telegram</b> - ${user?.user_tg_username}\n` +
        `<b>Sana</b> - ${DateTime.getCurrentDate()}`;    

    } else {

        msg = `<b>Yo'lovchi</b> 📣\n` + 
        `#yulovchi\n\n` +
        `🚩 <b>Qayerdan</b> - ${ctx.session.departureRegion || ""} ${ctx.session.departureDistrict || ""}\n` +
        `🏁 <b>Qayerga</b> - ${ctx.session.destinationRegion || ""} ${ctx.session.destinationDistrict || ""}\n` +
        `📅 <b>Qachon</b> - ${ctx.session.leavingDate}\n` +
        `📝 <b>Izoh</b> - ${ctx.session.passengerInformation}\n\n` +
        `<b>E'lon joyladi:</b>\n` +
        `<b>Yo'lovchi</b> - ${user?.first_name} ${user?.last_name}\n` + 
        `<b>Telefon raqami</b> - ${user?.phone_number}\n` + 
        `<b>Telegram</b> - ${user?.user_tg_username}\n` +
        `<b>Sana</b> - ${DateTime.getCurrentDate()}`;

    }


    return msg;
}



export const adsListMessage = async (ads?: AdsType, userType?: string) => {
    let msg: string;


    if (userType === UserTypeEnum.DRIVER) {
        
        msg = `<b>E\'lon #${ads?.id}</b>\n\n` + 
        `🚩 <b>Qayerdan</b> - ${ads?.departure_region || ""}, ${ads?.departure_district || ""}\n` +
        `🏁 <b>Qayerga</b> - ${ads?.destination_region || ""}, ${ads?.destination_district || ""}\n` +
        `📅 <b>Qachon</b> - ${ads?.leaving_date}\n` +
        `👥 <b>Yo'lovchilar soni</b> - ${ads?.passengers_count} ta\n` +
        `💸 <b>Narxi</b> - ${ads?.taxi_fee}\n\n` + 
        `${ads?.status == "went" ? "<b>🔴 Status</b> - Ketdim" : "<b>🟢 Status</b> - Qidirmoqda"}`;  

    } else {

        msg = `<b>E\'lon #${ads?.id}</b>\n\n` + 
        `🚩 <b>Qayerdan</b> - ${ads?.departure_region || ""} ${ads?.departure_district || ""}\n` +
        `🏁 <b>Qayerga</b> - ${ads?.destination_region || ""} ${ads?.destination_district || ""}\n` +
        `📅 <b>Qachon</b> - ${ads?.leaving_date}\n` +
        `📝 <b>Izoh</b> - ${ads?.passenger_details}\n\n` +
        `${ads?.status == "went" ? "🔴 Status - Ketdim" : "🟢 Status - Qidirmoqda"}`;

    }


    return msg;
}