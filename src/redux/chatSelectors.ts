import {AppStateType} from "./reduxStore";

export const getMessages = (state: AppStateType) => {
    return state.chat.messages
};
export const getIsConnected = (state: AppStateType) => {
    return state.chat.isConnected
}