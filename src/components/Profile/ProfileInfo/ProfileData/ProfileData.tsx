import React, {FC} from "react";
import style from "./ProfileData.module.scss";
import ProfileContacts from "./ProfileContacts/ProfileContacts";
import {ProfileType} from "../../../../types/types";

type Props = {
    isOwner: boolean
    profile: ProfileType | null
    enableDataForm: () => void
};

const ProfileData: FC<Props> = ({profile, enableDataForm, isOwner}) => {
    return (
        <div className={style.profileData}>
            {profile!.aboutMe && <div className={style.information}>About me: {profile!.aboutMe}</div>}
            <ProfileContacts contacts={profile!.contacts}/>
            <div className={style.information}>Looking for a job: {profile!.lookingForAJob ? 'Yes' : 'No'}</div>
            {profile!.lookingForAJobDescription
                    && <div className={style.information}>
                            Looking for a job description: {profile!.lookingForAJobDescription}
                        </div>}
            {isOwner && <button onClick={enableDataForm} className={style.editMode}>Edit data</button>}
        </div>
    );
};

export default ProfileData;