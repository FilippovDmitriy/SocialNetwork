import React, {FC} from "react";
import style from './User.module.scss';
import UserAva from '../../../assets/images/Users/UserAva.jpg'
import {NavLink} from "react-router-dom";

type PropsType = {
    id: number
    name: string
    status: string
    avaSrc: string
    followed: boolean
    followingProgress: Array<number>

    followUser: (id: number) => void
    unfollowUser: (id: number) => void
};

const User: FC<PropsType> = ({id, name,
                                 status, avaSrc,
                                 followed, followingProgress,
                                 followUser, unfollowUser}) => {

    return (
        <div className={style.user}>
            <div className={style.info}>
                <div className={style.ava}>
                    <NavLink to={`/profile/${id}`}>
                        <img alt={UserAva} src={!avaSrc ? UserAva : avaSrc}/>
                    </NavLink>
                </div>
                {followed
                    ? <button disabled={followingProgress.some(el => el === id)} onClick={() => {
                        unfollowUser(id);
                    }} className={style.button}>Unfollow</button>
                    : <button disabled={followingProgress.some(el => el === id)} onClick={() => {
                        followUser(id);
                    }} className={style.button}>Follow</button>}
            </div>
            <div className={style.main}>
                <div className={style.text}>
                    <div className={style.fullname}>{name}</div>
                    <div className={style.status}>{status}</div>
                </div>
            </div>
        </div>
    )
};

export default User;