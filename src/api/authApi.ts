import {GeneralResponseType, instance, ResultsCodes, ResultsCodesForCaptcha} from "./api";

type LogInResponseData= {
    userId: number
};
type GetUserProfileResponseData = {
    id: number
    email: string
    login: string
};

export const authAPI = {
    async logIn(email: string, password: string, rememberMe = false, captcha: string) {
        let response = await instance.post<GeneralResponseType<LogInResponseData, ResultsCodes | ResultsCodesForCaptcha>>(`auth/login`, {email, password, rememberMe, captcha});
        return response.data;
    },
    async logOut() {
        let response = await instance.delete<GeneralResponseType>(`auth/login`);
        return response.data;
    },
    async getUserProfile() {
        let response = await instance.get<GeneralResponseType<GetUserProfileResponseData>>(`auth/me`)
        return response.data;
    },
};