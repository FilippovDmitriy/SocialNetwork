import React, {FC, useEffect} from "react";
import {connect} from "react-redux";
import Profile from "./Profile";
import {
    getProfile, updateProfile,
    setProfileStatus, updateProfileStatus,
    setProfilePhotoFile, actions
} from "../../redux/profileReducer";
import {RouteComponentProps, withRouter} from "react-router-dom";
import {compose} from "redux";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../redux/reduxStore";
import {PostType, ProfileType} from "../../types/types";

type MapStateToPropsType = {
    profile: ProfileType | null
    posts: Array<PostType>
    profileStatus: string
    userId: number | null
};
type MapDispatchToPropsType = {
    getProfile: (userId: number) => void
    updateProfile: (profile: ProfileType) => void
    setProfileStatus: (userId: number) => void
    updateProfileStatus: (status: string) => void
    addPost: (text: string) => void
    setProfilePhotoFile: (file: File) => void
};
type PathParamsType = {
    userId: string
}
type WithRouterType = RouteComponentProps<PathParamsType>
type OwnPropsType = {};
type PropsType = MapStateToPropsType & MapDispatchToPropsType & WithRouterType & OwnPropsType;

const ProfileContainer: FC<PropsType> = (props) => {

    const matchUserId = +props.match.params.userId;
    const {userId, history, getProfile, setProfileStatus, profile} = props;

    let isOwner = false;

    useEffect(() => {
        if (!matchUserId && !userId) {
            history.push("/login")
        } else {
            if (!matchUserId && userId) {
                getProfile(userId);
                setProfileStatus(userId);
            } else {
                getProfile(matchUserId);
                setProfileStatus(matchUserId);
            }
        }
    }, [matchUserId, userId, history, getProfile, setProfileStatus, isOwner]);

    if (!matchUserId) {
        isOwner = true;
    }

    return (
        profile === null ? <Preloader/> : <Profile profile={props.profile}
                                                   posts={props.posts}
                                                   updateProfile={props.updateProfile}
                                                   profileStatus={props.profileStatus}
                                                   updateProfileStatus={props.updateProfileStatus}
                                                   setProfilePhotoFile={props.setProfilePhotoFile}
                                                   isOwner={isOwner}
                                                   addPost={props.addPost}/>
    );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    profile: state.profilePage.profile,
    posts: state.profilePage.posts,
    profileStatus: state.profilePage.status,
    userId: state.auth.id,
});

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
            getProfile, setProfileStatus, updateProfile,
            updateProfileStatus, addPost: actions.addPost, setProfilePhotoFile}),
    withRouter,
)(ProfileContainer);