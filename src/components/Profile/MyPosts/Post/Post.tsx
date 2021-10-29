import React, {FC} from 'react';
import style from './Post.module.css';

type Props = {
    message: string
};

const Post: FC<Props> = ({message}) => {
    return (
       <div className={style.post}>
           <div className={style.text}>{message}</div>
       </div>
    );
}

export default Post;