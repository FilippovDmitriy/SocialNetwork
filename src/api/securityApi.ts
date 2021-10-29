import {instance} from "./api";

export const securityAPI = {
    async getCaptcha() {
        let response = await instance.get<string>('security/get-captcha-url');
        return response.data;
    },
};