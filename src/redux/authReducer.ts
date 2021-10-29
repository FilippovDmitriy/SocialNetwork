import {ResultsCodes, ResultsCodesForCaptcha} from "../api/api";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";
import {authAPI} from "../api/authApi";

const SET_USER_DATA = 'samurai-network/auth/SET_USER_DATA';
const SET_ERROR = 'samurai-network/auth/SET_ERROR';
const SET_IS_CAPTCHA = 'samurai-network/auth/SET_IS_CAPTCHA';

const initialState = {
    id: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    error: null as string | null,
    isCaptcha: false as boolean,
};

const authReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_USER_DATA: return {...state, ...action.data};
        case SET_ERROR: return {...state, error: action.error};
        case SET_IS_CAPTCHA: return {...state, isCaptcha: action.isCaptcha};
        default: return state;
    }
};

type UserDataType = {
    id: number | null
    email: string | null
    login: string | null
    isAuth: boolean
};
export const actions = {
    setUserData: (data: UserDataType) => ({type: SET_USER_DATA, data} as const),
    setError: (error: string) => ({type: SET_ERROR, error} as const),
    setIsCaptcha: (isCaptcha: boolean) => ({type: SET_IS_CAPTCHA, isCaptcha} as const),
};

export const logIn = (email: string, password: string,
                      rememberMe: boolean, captcha: string): ThunkActionComplete => async (dispatch) => {
    let response = await authAPI.logIn(email, password, rememberMe, captcha);
    dispatch(actions.setIsCaptcha(false));
    if (response.resultCode === ResultsCodes.Success) {
        await dispatch(getUserProfile());
    } else {
        if (response.resultCode === ResultsCodesForCaptcha.IsCaptcha) {
            dispatch(actions.setIsCaptcha(true));
        }
        let error = response.messages.length > 0 ? response?.messages[0] : 'Some error';
        dispatch(actions.setError(error));
    }
};
export const logOut = (): ThunkActionComplete => async (dispatch) => {
    let response = await authAPI.logOut();
    if (response.resultCode === ResultsCodes.Success) {
        dispatch(actions.setUserData({id: null, email: null, login: null, isAuth: false}));
    }
};
export const getUserProfile = (): ThunkActionComplete => async (dispatch) => {
    let data = await authAPI.getUserProfile();
    if (data.resultCode === ResultsCodes.Success) {
        dispatch(actions.setUserData({...data.data, isAuth: true}));
    }
};

export default authReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = BaseThunkType<ActionsTypes>;