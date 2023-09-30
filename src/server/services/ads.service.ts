import { knex } from "../database/knexfile"
import { AdsType } from "../types";

type TCondition = {
    id?: number,
    user_tg_id?: number
}

export const getCustomAds = async (condition: TCondition) => {
    return knex("ads").select().where(condition);
}

export const getOneCustomAds = async (condtion: TCondition) => {
    return knex("ads").select().where(condtion).first();
}

export const addAds = async (ads: AdsType) => {
    return knex("ads").insert(ads);
}


export const updateAds = async (id: number, options: object) => {
    await knex("ads").update(options).where({
        id
    });

    return knex("ads").select().where({
        id
    }).first();
}