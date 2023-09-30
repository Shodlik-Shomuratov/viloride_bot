export interface SessionData {
    userType: string;
    firstName: string;
    lastName: string;
    phoneNumber?: string;
    userTgUsername?: string;
    carModel?: string;
    carNumber: string;
    isConversation: boolean;
    departureRegion: string;
    departureDistrict: string;
    destinationRegion: string;
    destinationDistrict: string;
    leavingDate: string;
    taxiFee?: string;
    passengerCount: number;
    passengerInformation?: string;
    weekCounter: number;
    postAdsMessageId?: number;
    postAdsChatId?: number;
    currentAdsId: number;
    adsCount: number;
}