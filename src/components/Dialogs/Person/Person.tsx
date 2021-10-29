import React, {FC} from 'react';
import style from './Person.module.scss';
import {NavLink} from "react-router-dom";

type PropsType = {
    name: string
    id: number
};

const Person: FC<PropsType> = ({id, name}) => {
    return (
        <div className={style.person}>
            <NavLink to={`/dialogs/${id}`}>{name}</NavLink>
        </div>
    )
}

export default Person;