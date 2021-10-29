import React, {FC, useEffect} from "react";
import {ChatMessages} from "./ChatMessages/ChatMessages";
import {ChatForm} from "./ChatForm/ChatForm";
import {useDispatch} from "react-redux";
import {startMessagesListening, stopMessagesListening} from "../../redux/chatReducer";

const Chat: FC = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(startMessagesListening());
        return () => {
            dispatch(stopMessagesListening())
        };
    }, [dispatch])

    return <div>
        <ChatMessages/>
        <ChatForm/>
    </div>
};

export default Chat;