import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./reduxStore";
import {securityAPI} from "../api/securityApi";

const SET_CAPTCHA_URL = 'samurai-network/security/SET_CAPTCHA_URL';
const DELETE_CAPTCHA_URL = 'samurai-network/security/DELETE_CAPTCHA_URL';

const initialState = {
    captchaUrl: null as string | null,
};

const securityReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA_URL: return {...state, captchaUrl: action.captchaUrl};
        case DELETE_CAPTCHA_URL: return {...state, captchaUrl: null}
        default: return state;
    }
};

export const actions = {
    getCaptchaUrl: (captchaUrl: string) => ({type: SET_CAPTCHA_URL, captchaUrl} as const),
    deleteCaptchaUrl: () => ({type: DELETE_CAPTCHA_URL} as const)
};

export const getCaptcha = (): ThunkActionComplete => async (dispatch) => {
    let captchaUrl = await securityAPI.getCaptcha();
    dispatch(actions.getCaptchaUrl(captchaUrl));
};

export default securityReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = ThunkAction<Promise<void>, AppStateType, unknown, ActionsTypes>;