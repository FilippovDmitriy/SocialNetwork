import {AppStateType} from "./reduxStore";

export const getUsersSelector = (state: AppStateType) => {
    return state.usersPage.users;
};

export const getPageSide = (state: AppStateType) => {
    return state.usersPage.pageSide;
};

export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
};

export const getFilter = (state: AppStateType) => {
    return state.usersPage.filter;
};

export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
    return state.usersPage.isFetching;
};

export const getFollowingProgress = (state: AppStateType) => {
    return state.usersPage.followingProgress;
};