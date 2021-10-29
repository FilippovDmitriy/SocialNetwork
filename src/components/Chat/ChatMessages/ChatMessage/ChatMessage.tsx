import React, {FC} from "react";
import {ChatMessageType} from "../../../../types/types";

export const ChatMessage: FC<{ message: ChatMessageType }> = React.memo(({message}) => {
    return <div>
        <div className="avatar" style={{width: '30px', height: '30px',}}>
            <img src={message.photo} alt=""/>
        </div>
        <div className="chatMain">
            <div className="name">{message.userName}</div>
            <div className="message">{message.message}</div>
        </div>
    </div>
});