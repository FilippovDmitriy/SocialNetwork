import {ResultsCodes} from "../api/api";
import {UserType} from "../types/types";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {usersAPI} from "../api/usersApi";

const FOLLOW = 'samurai-network/users/FOLLOW';
const UNFOLLOW= 'samurai-network/users/UNFOLLOW';
const SET_USERS = 'samurai-network/users/SET_USERS';
const SET_CURRENT_PAGE = 'samurai-network/users/SET_CURRENT_PAGE';
const SET_FILTER = 'samurai-network/users/SET_FILTER';
const SET_TOTAL_USERS_COUNT = 'samurai-network/users/SET_TOTAL_USERS_COUNT';
const SET_IS_FETCHING = 'samurai-network/users/SET_IS_FETCHING';
const SET_FOLLOWING_PROGRESS = 'samurai-network/users/SET_FOLLOWING_PROGRESS';

const initialState = {
    users: [] as Array<UserType>,
    pageSide: 5 as number,
    totalUsersCount: 0 as number,
    currentPage: 1 as number,
    filter: {
        term: '' as string,
        friend: null as null | boolean
    } as FilterType,
    isFetching: false as boolean,
    followingProgress: [] as Array<number>,
};

const usersReducer = (state = initialState, action: ActionsTypes): InitialState => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state, users: state.users.map( u => {
                    if (u.id === action.userId) {
                        return {...u, followed: true};
                    }
                    return u;
                }),
            };
        case UNFOLLOW:
            return {
                ...state, users: state.users.map(u => {
                    if (u.id === action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                }),
            };
        case SET_USERS:
            return {...state, users: action.users}
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.pageId}
        case SET_FILTER:
            return {...state, filter: action.filter}
        case SET_TOTAL_USERS_COUNT:
            return {...state, totalUsersCount: action.count}
        case SET_IS_FETCHING:
            return {...state, isFetching: action.isFetching}
        case SET_FOLLOWING_PROGRESS:
            return {...state, followingProgress: action.followingProgress
                    ? [...state.followingProgress, action.id]
                    : [...state.followingProgress.filter(el => el !== action.id)]}
        default:
            return state;
    }
};

export const actions = {
    followUserSuccess: (userId: number) => ({type: FOLLOW, userId} as const),
    unfollowUserSuccess: (userId: number) => ({type: UNFOLLOW, userId} as const),
    getUsersSuccess: (users: Array<UserType>) => ({type: SET_USERS, users} as const),
    setCurrentPage: (pageId: number) => ({type: SET_CURRENT_PAGE, pageId} as const),
    setFilter: (filter: FilterType) => ({type: SET_FILTER, filter} as const),
    setTotalUsersCount: (count: number) => ({type: SET_TOTAL_USERS_COUNT, count} as const),
    setIsFetching: (isFetching: boolean) => ({type: SET_IS_FETCHING, isFetching} as const),
    setFollowingProgress: (followingProgress: boolean, id: number) => ({type: SET_FOLLOWING_PROGRESS, followingProgress, id} as const),
};

export const followUserThunk = (id: number): ThunkActionComplete => async (dispatch) => {
    dispatch(actions.setFollowingProgress(true, id));
    let data = await usersAPI.follow(id);
    if (data.resultCode === ResultsCodes.Success) dispatch(actions.followUserSuccess(id));
    dispatch(actions.setFollowingProgress(false, id));
};
export const unfollowUserThunk = (id: number): ThunkActionComplete => async (dispatch) => {
    dispatch(actions.setFollowingProgress(true, id));
    let data = await usersAPI.unfollow(id);
    if (data.resultCode === ResultsCodes.Success) dispatch(actions.unfollowUserSuccess(id));
    dispatch(actions.setFollowingProgress(false, id));
};
export const getUsers = (currentPage: number, pageSide: number, term: string, friend: boolean | null): ThunkActionComplete => async (dispatch) => {
    dispatch(actions.setIsFetching(false));
    let data = await usersAPI.getUsers(currentPage, pageSide, term, friend)
    dispatch(actions.getUsersSuccess(data.items));
    dispatch(actions.setTotalUsersCount(data.totalCount));
    dispatch(actions.setIsFetching(true));
};

export default usersReducer;

type InitialState = typeof initialState;
export type FilterType = {
    term: string
    friend: null | boolean
};
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = BaseThunkType<ActionsTypes>;