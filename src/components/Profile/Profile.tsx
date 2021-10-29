import React, {FC} from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import style from './Profile.module.css';
import MyPosts from "./MyPosts/MyPosts";
import {PostType, ProfileType} from "../../types/types";

type PropsType = {
    profile: ProfileType | null
    updateProfile: (profile: ProfileType) => void
    posts: Array<PostType>
    profileStatus: string
    updateProfileStatus: (status: string) => void
    setProfilePhotoFile: (file: File) => void
    isOwner: boolean
    addPost: (text: string) => void
};

const Profile: FC<PropsType> = (props) => {
    return (
        <div className={style.profile}>
            <ProfileInfo profile={props.profile}
                         updateProfile={props.updateProfile}
                         profileStatus={props.profileStatus}
                         updateProfileStatus={props.updateProfileStatus}
                         isOwner={props.isOwner}
                         setProfilePhotoFile={props.setProfilePhotoFile}/>
            <MyPosts addPost={props.addPost} posts={props.posts}/>
        </div>
    );
}

export default Profile;
