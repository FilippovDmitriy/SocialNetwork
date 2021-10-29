import profileReducer, {actions, InitialStateType} from "./profileReducer";
import {ProfileType} from "../types/types";

let state: InitialStateType;
let profile: ProfileType = {
    userId: 1,
    lookingForAJob: true,
    lookingForAJobDescription: 'string',
    fullName: 'string',
    aboutMe: 'string',
    contacts: {
        github: 'string',
        vk: 'string',
        facebook: 'string',
        instagram: 'string',
        twitter: 'string',
        website: 'string',
        youtube: 'string',
        mainLink: 'string',
    },
    photos: {
        small: 'string',
        large: 'string',
    },
};
let photoUrls = {
    small: 'smallUrl',
    large: 'largeUrl',
};
beforeEach(() => {
    state = {
        profile: null,
        status: '',
        posts: [
            {id: 1, message: 'It\'s our new program! Hey! Hey!'},
            {id: 2, message: 'It\'s my first post'},
        ],
    };
});

test('post length should be increment after add', () => {
    // 1. Test data
    let action = actions.addPost('Hello friend');

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});
test('post length should be decremented after delete', () => {
    // 1. Test data
    let action = actions.deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(1);
});
test('profile should be add in reducer after get', () => {
    let action = actions.getProfileSuccess(profile);

    let newState = profileReducer(state, action);

    expect(newState.profile).toBe(profile)
});
test('profile should be add in reducer after update', () => {
    state.profile = profile;
    let newProfile = {
        fullName: 'DF',
        lookingForAJob: false,
        userId: 1,
        lookingForAJobDescription: 'string',
        aboutMe: 'string',
        contacts: {
            github: 'string',
            vk: 'string',
            facebook: 'string',
            instagram: 'string',
            twitter: 'string',
            website: 'string',
            youtube: 'string',
            mainLink: 'string',
        },
        photos: {
            small: 'string',
            large: 'string',
        },
    };
    let action = actions.updateProfileSuccess(newProfile);

    let newState = profileReducer(state, action);

    expect(newState.profile?.fullName).toStrictEqual('DF')
});
test('status should be set in reducer after set', () => {
    let action = actions.setProfileStatusSuccess('new status');
    let newState = profileReducer(state, action);
    expect(newState.status).toBe('new status');
});
test('photo urls should be set in reducer after setProfile', () => {
    state.profile = profile;
    let action = actions.setProfilePhotoFileSuccess(photoUrls);
    let newState = profileReducer(state, action);
    expect(newState.profile?.photos.small).toStrictEqual('smallUrl');
    expect(newState.profile?.photos.large).toStrictEqual('largeUrl');
});