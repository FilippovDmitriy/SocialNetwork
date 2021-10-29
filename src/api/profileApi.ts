import {ProfilePhotoType, ProfileType} from "../types/types";
import {GeneralResponseType, instance} from "./api";

type SetProfilePhotoFile = {
    photos: ProfilePhotoType
}

export const profileAPI = {
    async getProfile(userId: number) {
        let response = await instance.get<ProfileType>(`profile/${userId}`)
        return response.data;
    },
    async updateProfile(profile: ProfileType) {
        let response = await instance.put<GeneralResponseType>('/profile', {...profile});
        return response.data;
    },
    async setProfileStatus(userId: number) {
        let response = await instance.get<string>(`profile/status/${userId}`);
        return response.data;
    },
    async updateProfileStatus(status: string) {
        let response = await instance.put<GeneralResponseType>(`profile/status`, {status: status});
        return response.data;
    },
    async setProfilePhotoFile(file: File) {
        let formData = new FormData();
        formData.append("image", file);
        let response =  await instance.put<GeneralResponseType<SetProfilePhotoFile>>(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
        });
        return response.data;
    },
};