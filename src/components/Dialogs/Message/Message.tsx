import React, {FC} from 'react';
import style from './Message.module.scss';

type PropsType = {
    message: string
};

const Message: FC<PropsType> = (props) => {
    return (
        <div className={style.message}>{props.message}</div>
    )
}

export default Message;