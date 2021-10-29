import {getUserProfile} from "./authReducer";
import {BaseThunkType, InferActionsTypes} from "./reduxStore";

const INITIALIZED_SUCCESS = 'samurai-network/app/INITIALIZED_SUCCESS';

const initialState = {
    initialized: false as boolean
};

const appReducer = (state = initialState, action: ActionsTypes): InitialStateType => {
    switch (action.type) {
        case INITIALIZED_SUCCESS: return {...state, initialized: true}
        default: return state
    }
};

export const actions = {
    initializedSuccess: () => ({type: INITIALIZED_SUCCESS} as const)
};

export const initializeApp = (): ThunkActionComplete => async (dispatch) => {
    let promise = dispatch(getUserProfile());
    await Promise.all([promise]);
    dispatch(actions.initializedSuccess());
};

export default appReducer;

type InitialStateType = typeof initialState;
type ActionsTypes = InferActionsTypes<typeof actions>;
type ThunkActionComplete = BaseThunkType<ActionsTypes>;