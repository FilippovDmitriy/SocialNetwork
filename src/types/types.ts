export type PersonType = {
    id: number,
    name: string,
};
export type MessageType = {
    id: number,
    message: string,
};
export type UserType = {
    id: number
    name: string
    status: string
    photos: ProfilePhotoType
    followed: boolean
};
export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ContactsType
    photos: ProfilePhotoType
};
export type ProfilePhotoType = {
    small: string
    large: string
};
export type ContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
};
export type PostType = {
    id: number
    message: string
};
export type ChatMessageType = {
    message: string
    photo: string
    userId: number
    userName: string
};