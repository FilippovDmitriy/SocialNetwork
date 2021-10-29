import React, {FC} from 'react';
import style from './Navigation.module.css';
import {NavLink} from "react-router-dom";

const Navigation: FC = () => {
    return (
        <nav className={style.nav}>
            <div className={style.link}>
                <NavLink to="/profile">Profile</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/dialogs">Messages</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/chat">Chat</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/news">News</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/music">Music</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/settings">Settings</NavLink>
            </div>
            <div className={style.link}>
                <NavLink to="/users">Users</NavLink>
            </div>
        </nav>
    )
}

export default Navigation;