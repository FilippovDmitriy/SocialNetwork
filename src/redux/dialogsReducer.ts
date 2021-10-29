import {MessageType, PersonType} from "../types/types";
import {InferActionsTypes} from "./reduxStore";

const ADD_MESSAGE = 'samurai-network/dialogs/ADD-MESSAGE';

const initialState = {
    personsData: [
        {id: 1, name: 'Dmitriy'},
        {id: 2, name: 'Andrey'},
        {id: 3, name: 'Svetlana'},
        {id: 4, name: 'Aleksander'},
        {id: 5, name: 'Victor'},
    ] as Array<PersonType>,
    messagesData: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How are you?'},
        {id: 3, message: 'Yo'},
    ] as Array<MessageType>,
};

const dialogsReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage: MessageType = {
                id: 5,
                message: action.text,
            };
            return {...state, messagesData: [...state.messagesData, newMessage]};
        default: return state;
    }
};

export const actions = {
    addMessage: (text: string) => ({type: ADD_MESSAGE, text: text} as const)
};

export default dialogsReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;