export type AdsType = {
    id?: number,
    user_tg_id?: number,
    departure_region: string,
    departure_district: string,
    destination_region: string,
    destination_district: string,
    leaving_date: string,
    passengers_count?: number,
    taxi_fee?: string,
    passenger_details?: string,
    status: string
}