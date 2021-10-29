import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import style from './ProfileStatus.module.scss';
import {maxLength} from "../../../../utils/validators/validators";

type PropsType = {
    isOwner: boolean
    profileStatus: string
    updateProfileStatus: (status: string) => void
};

const ProfileStatus: FC<PropsType> = ({isOwner, profileStatus, updateProfileStatus}) => {

    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(profileStatus);

    useEffect(() => {
        setStatus(profileStatus);
    }, [profileStatus]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        updateProfileStatus(status);
    };

    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (maxLength300(value) === undefined) {
            setStatus(value);
        }
    };

    const maxLength300 = maxLength(300);

    return (
        <div className={style.status}>
            {editMode
                ? <input
                    onChange={changeStatus} onBlur={deactivateEditMode}
                    className={style.active}
                    autoFocus={true} value={status}/>
                : <span onDoubleClick={() => {if (isOwner) activateEditMode()}}>
                    {(!status && isOwner) ? 'Установить статус' : status}
                  </span>
            }
        </div>
    );
}

export default ProfileStatus;