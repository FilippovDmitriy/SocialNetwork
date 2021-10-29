import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "41a67e87-58bf-4fa4-8738-85c49f1aba59",
    },
});

export enum ResultsCodes {
    Success = 0,
}
export enum ResultsCodesForCaptcha {
    IsCaptcha = 10,
}

export type GeneralResponseType<DataType = {}, ResultsCodesEnum = ResultsCodes> = {
    data: DataType
    messages: Array<string>
    resultCode: ResultsCodesEnum
};