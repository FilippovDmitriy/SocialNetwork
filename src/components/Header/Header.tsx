import React, {FC} from 'react';
import style from "./Header.module.scss"
import {NavLink} from "react-router-dom";

type PropsType = {
    isAuth: boolean
    login: string | null
    logOut: () => void
};

const Header: FC<PropsType> = ({isAuth, login, logOut}) => {
    return (
        <header className={style.header}>
            <img src="img/logo.png" alt=""/>
            {isAuth
                ?   <div className={style.authorization}>
                        <div className={style.login}>{login}</div>
                        <button className={style.logOut} onClick={logOut}>LogOut</button>
                    </div>
                :   <div className={style.authorization}>
                        <NavLink to={'/login'}>Login</NavLink>
                    </div>}
        </header>
    );
}

export default Header;