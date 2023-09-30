import { knex } from "../database/knexfile"
import { UserType } from "../types/user.type";


type TCondition = {
    user_tg_id?: number
}


export const getAllUsers = async () => {
    return knex("users").select();
}


export const addUser = async (user: UserType) => {
    return knex("users").insert(user);
}


export const getCustomUser = async (condition: TCondition) => {
    return knex("users").select().where(condition).first();
}