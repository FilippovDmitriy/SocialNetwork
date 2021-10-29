import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {ChatMessageType} from "../types/types";
import {chatAPI} from "../api/chatApi";
import {Dispatch} from "redux";

const MESSAGES_RECEIVED = 'samurai-network/profile/MESSAGES_RECEIVED';
const SET_IS_CONNECTED = 'samurai-network/profile/SET_IS_CONNECTED';

const initialState = {
    messages: [] as ChatMessageType[],
    isConnected: false as boolean,
};

const chatReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case MESSAGES_RECEIVED:
            return {...state, messages: [...state.messages, ...action.payload.messages]};
        case SET_IS_CONNECTED:
            return {...state, isConnected: action.payload.isConnected};
        default: return state;
    }
};

export const actions = {
    messagesReceived: (messages: ChatMessageType[]) => ({type: MESSAGES_RECEIVED, payload: {messages}} as const),
    setIsConnected: (isConnected: boolean) => ({type: SET_IS_CONNECTED, payload: {isConnected}} as const),
};

let _newMessageHandler: ((messages: ChatMessageType[]) => void) | null = null;
const newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null) {
        _newMessageHandler = (messages) => {
            dispatch(actions.messagesReceived(messages))
        }
    }

    return _newMessageHandler;
}

let _statusChangedHandler: ((isConnected: boolean) => void) | null = null;
const statusChangedHandlerCreator = (dispatch: Dispatch) => {
    if (_statusChangedHandler === null) {
        _statusChangedHandler = (isConnected) => {
            dispatch(actions.setIsConnected(isConnected));
        }
    }
    return _statusChangedHandler;
};

export const startMessagesListening = (): ThunkActionComplete => async (dispatch) => {
    chatAPI.start();
    chatAPI.subscribe('messagesReceived', newMessageHandlerCreator(dispatch));
    chatAPI.subscribe('changeIsConnected', statusChangedHandlerCreator(dispatch))
};
export const stopMessagesListening = (): ThunkActionComplete => async (dispatch) => {
    chatAPI.unsubscribe('messagesReceived', newMessageHandlerCreator(dispatch));
    chatAPI.unsubscribe('changeIsConnected', statusChangedHandlerCreator(dispatch));
    chatAPI.stop();
};
export const sendMessage = (message: string): ThunkActionComplete => async (dispatch) => {
    chatAPI.sendMessage(message);
}

export default chatReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = BaseThunkType<ActionsTypes>;