export enum UserTypeEnum {
    DRIVER = 'driver',
    PASSENGER = 'passenger'
}

export type UserType = {
    id?: number;
    user_type: string;
    user_tg_id?: number;
    user_tg_username?: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    car_model?: string;
    car_number?: string
}