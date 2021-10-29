import React, {FC, useState} from 'react';
import s from './ProfileInfo.module.scss';
import UserAva from '../../../assets/images/Users/avatar.jpg';
import ProfileStatus from "./ProfileStatus/ProfileStatus";
import ProfileSetImage from "./ProfileSetImage/ProfileSetImage";
import ProfileData from "./ProfileData/ProfileData";
import ProfileDataForm from "./ProfileDataForm/ProfileDataForm";
import classNames from "classnames";
import {ProfileType} from "../../../types/types";

type PropsType = {
    profile: ProfileType | null
    updateProfile: (profile: ProfileType) => void
    profileStatus: string
    updateProfileStatus: (status: string) => void
    setProfilePhotoFile: (file: File) => void
    isOwner: boolean
};

const ProfileInfo: FC<PropsType> = ({profile, updateProfile, profileStatus,
                                        updateProfileStatus, isOwner, setProfilePhotoFile}) => {

    const [editAva, setEditAva] = useState(false);
    const [dataForm, toggleDataForm] = useState(false);

    return (
        <div className={s.profileInfo}>
            <div onMouseEnter={() => setEditAva(true)}
                 onMouseLeave={() => setEditAva(false)}
                 className={s.ava}>
                <img src={!profile!.photos.large
                    ? UserAva
                    : profile!.photos.large} alt=""/>
                {isOwner && <ProfileSetImage className={classNames({'active': editAva})}
                                                   setProfilePhotoFile={setProfilePhotoFile}/>}
            </div>
            <div className={s.main}>
                <div className={s.fullName}>{profile!.fullName}</div>
                <ProfileStatus isOwner={isOwner}
                               profileStatus={profileStatus}
                               updateProfileStatus={updateProfileStatus}/>
                {dataForm
                    ? <ProfileDataForm profile={profile}
                                       disableDataForm={() => toggleDataForm(false)}
                                       updateProfile={updateProfile}/>
                    : <ProfileData isOwner={isOwner}
                                   enableDataForm={() => toggleDataForm(true)}
                                   profile={profile}/> }
            </div>
        </div>
    )
}

export default ProfileInfo;