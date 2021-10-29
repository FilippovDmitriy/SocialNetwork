import {ResultsCodes} from "../api/api";
import {PostType, ProfilePhotoType, ProfileType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {profileAPI} from "../api/profileApi";

const GET_PROFILE = 'samurai-network/profile/GET_PROFILE';
const UPDATE_PROFILE = 'samurai-network/profile/UPDATE_PROFILE';
const SET_PROFILE_STATUS = 'samurai-network/profile/SET_PROFILE_STATUS';
const ADD_POST = 'samurai-network/profile/ADD-POST';
const DELETE_POST = 'samurai-network/profile/DELETE-POST';
const SET_PROFILE_PHOTO_FILE = 'samurai-network/profile/SET_PROFILE_PHOTO_FILE';

const initialState = {
    profile: null as ProfileType | null,
    status: '' as string,
    posts: [
        {id: 1, message: 'It\'s our new program! Hey! Hey!'},
        {id: 2, message: 'It\'s my first post'},
    ] as Array<PostType>,
};

const profileReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case GET_PROFILE: return {...state, profile: action.profile};
        case UPDATE_PROFILE: return {...state, profile: {...state.profile, ...action.profile}};
        case SET_PROFILE_STATUS: return {...state, status: action.status};
        case ADD_POST:
            let newPost = {
                id: 5,
                message: action.text,
            };
            return {...state, posts: [newPost, ...state.posts]};
        case DELETE_POST:
            return {...state, posts: state.posts.filter(post => post.id !== action.id)};
        case SET_PROFILE_PHOTO_FILE:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    photos: {
                        small: action.photos.small,
                        large: action.photos.large,
                    }
                } as ProfileType
            }
        default: return state;
    }
};

export const actions = {
    addPost: (text: string) => ({type: ADD_POST, text} as const),
    deletePost: (id: number) => ({type: DELETE_POST, id} as const),
    getProfileSuccess: (profile: ProfileType) => ({type: GET_PROFILE, profile} as const),
    updateProfileSuccess: (profile: ProfileType) => ({type: UPDATE_PROFILE, profile} as const),
    setProfileStatusSuccess: (status: string) => ({type: SET_PROFILE_STATUS, status} as const),
    setProfilePhotoFileSuccess: (photos: ProfilePhotoType) => ({type: SET_PROFILE_PHOTO_FILE, photos} as const),
};

export const getProfile = (userId: number): ThunkActionComplete => async (dispatch) => {
    let profile = await profileAPI.getProfile(userId);
    dispatch(actions.getProfileSuccess(profile));
};
export const updateProfile = (profile: ProfileType): ThunkActionComplete => async (dispatch) => {
    let response = await profileAPI.updateProfile(profile);
    if (response.resultCode === ResultsCodes.Success) {
        dispatch(actions.updateProfileSuccess({...profile}));
    }
};
export const setProfileStatus = (userId: number): ThunkActionComplete => async (dispatch) => {
    let status = await profileAPI.setProfileStatus(userId);
    dispatch(actions.setProfileStatusSuccess(status));
};
export const updateProfileStatus = (status: string): ThunkActionComplete => async (dispatch) => {
    let response = await profileAPI.updateProfileStatus(status);
    if (response.resultCode === ResultsCodes.Success) {
        dispatch(actions.setProfileStatusSuccess(status));
    }
};
export const setProfilePhotoFile = (file: File): ThunkActionComplete => async (dispatch) => {
    let response = await profileAPI.setProfilePhotoFile(file);
    if (response.resultCode === ResultsCodes.Success) {
        dispatch(actions.setProfilePhotoFileSuccess(response.data.photos));
    }
};

export default profileReducer;

export type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = BaseThunkType<ActionsTypes>;