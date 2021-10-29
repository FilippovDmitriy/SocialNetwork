import styles from './Login.module.scss';
import React, {FC} from "react";
import LoginForm from "./LoginForm/LoginForm";
import {Redirect} from "react-router-dom";

type PropsType = {
    isAuth: boolean,
    setIsSubmitForm: (isSubmit: boolean) => void
    error: string | null
    captchaUrl: string | null
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
};

const Login: FC<PropsType> = ({isAuth, setIsSubmitForm, error, captchaUrl, logIn}) => {

    if (isAuth) {
        return <Redirect to={'/profile'}/>
    }

    return (
        <div className={styles.login}>
            <h1>Sign In</h1>
            <LoginForm error={error}
                       captchaUrl={captchaUrl}
                       logIn={logIn}
                       setIsSubmitForm={setIsSubmitForm}/>
        </div>
    );
};

export default Login;