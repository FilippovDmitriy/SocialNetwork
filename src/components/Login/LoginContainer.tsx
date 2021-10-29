import React, {FC, useEffect, useState} from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import {logIn} from "../../redux/authReducer";
import Login from "./Login";
import {actions, getCaptcha} from "../../redux/securityReducer";
import {AppStateType} from "../../redux/reduxStore";

type MapStateToPropsType = {
    isAuth: boolean,
    error: string | null
    isCaptcha: boolean
    captchaUrl: string | null
};
type MapDispatchToPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    getCaptcha: () => void
    deleteCaptchaUrl: () => void
};
type OwnPropsType = {};
type PropsType = MapStateToPropsType & MapDispatchToPropsType

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        isAuth: state.auth.isAuth,
        error: state.auth.error,
        isCaptcha: state.auth.isCaptcha,
        captchaUrl: state.security.captchaUrl,
    };
};

const LoginContainer: FC<PropsType> = ({isAuth, error,
                                           isCaptcha, captchaUrl,
                                           logIn, getCaptcha, deleteCaptchaUrl}) => {

    const [isSubmitForm, setIsSubmitForm] = useState(false);

    useEffect(() => {
        if (isCaptcha && isSubmitForm) {
            getCaptcha();
            setIsSubmitForm(false);
        } else {
            deleteCaptchaUrl();
        }
    }, [isCaptcha, getCaptcha, isSubmitForm, setIsSubmitForm, deleteCaptchaUrl]);

    return (
        <Login isAuth={isAuth} setIsSubmitForm={setIsSubmitForm} error={error} captchaUrl={captchaUrl} logIn={logIn}/>
    );
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {logIn, getCaptcha, deleteCaptchaUrl: actions.deleteCaptchaUrl}),
)(LoginContainer);