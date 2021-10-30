import React, {FC, useEffect, useRef, useState} from "react";
import style from "./ChatMessages.module.scss";
import {ChatMessage} from "./ChatMessage/ChatMessage";
import {ChatMessageType} from "../../../types/types";
import {useSelector} from "react-redux";
import {getMessages} from "../../../redux/chatSelectors";

export const ChatMessages: FC = () => {
    const messages = useSelector(getMessages);
    const messagesAnchorRef = useRef<HTMLDivElement>(null);
    const [isAutoScroll, setIsAutoScroll] = useState(true);

    const messageScrollHandler = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
        const element = e.currentTarget;
        if (Math.abs( (element.scrollHeight - element.scrollTop) - element.clientHeight ) < 300) {
            !isAutoScroll && setIsAutoScroll(true)
        } else {
            isAutoScroll && setIsAutoScroll(false)
        }
    };

    useEffect(() => {
        if (isAutoScroll) {
            messagesAnchorRef.current?.scrollIntoView();
        }
    }, [messages, isAutoScroll])

    return (
        <div className={style.chatMessages} onScroll={messageScrollHandler}>
            {messages.map((message: ChatMessageType, index: number) => <ChatMessage message={message} key={index}/>)}
            <div ref={messagesAnchorRef}>

            </div>
        </div>
    )
};