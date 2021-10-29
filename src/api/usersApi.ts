import {GeneralResponseType, instance} from "./api";
import {UserType} from "../types/types";

type GetUsers = {
    items: Array<UserType>
    totalCount: number
    error: string
};

export const usersAPI = {
    async getUsers (currentPage: number, pageSide: number, term: string, friend: boolean | null) {
        let response = await instance.get<GetUsers>(`users?page=${currentPage}&count=${pageSide}&term=${term}&friend=${friend}`)
        return response.data;
    },
    async follow(id: number) {
        let response = await instance.post<GeneralResponseType>(`follow/${id}`)
        return response.data;
    },
    async unfollow(id: number) {
        let response = await instance.delete<GeneralResponseType>(`follow/${id}`)
        return response.data;
    },
};