import React, {FC, useState} from "react";
import s from './LoginForm.module.scss';
import {Field, Form, Formik} from "formik";
import {Input} from "../../common/FormElements/FormElements";
import {emptyForm} from "../../../utils/validators/validators";
import classNames from "classnames";

type PropsType = {
    error: string | null
    captchaUrl: string | null
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
    setIsSubmitForm: (isSubmit: boolean) => void
};

const LoginForm: FC<PropsType> = ({error, captchaUrl, logIn, setIsSubmitForm}) => {

    const [hiddenPassword, setHiddenPassword] = useState(false);

    type LoginFormValuesType = {
        email: string
        password: string
        remember: boolean
        captcha: string
    };

    const onSubmitForm = (values: LoginFormValuesType) => {
        setIsSubmitForm(true);
        logIn(values.email, values.password, values.remember, values.captcha);
    };

    const toggleFormPassword = () => {
        if (hiddenPassword) {
            setHiddenPassword(false);
        } else {
            setHiddenPassword(true);
        }
    };

    return <Formik
        initialValues={{ email: '', password: '', remember: false, captcha: ''}}
        onSubmit={onSubmitForm}
    >
        {() => (
            <Form className={s.form}>
                <Field type="mail" component={Input} validate={emptyForm} name="email" placeholder='E-mail'/>
                <div className={s.password}>
                    <Field type={hiddenPassword ? "text" : "password"} component={Input} validate={emptyForm} name="password"
                           placeholder='Password'/>
                    <span onClick={toggleFormPassword} className={classNames(s.passwordControl, {
                        [s.hiddenPasswordControl]: hiddenPassword
                    })}>

                    </span>
                </div>
                <label className={s.checkboxLabel}>
                    <Field type="checkbox" component={Input} validate={emptyForm} name="remember"/>
                    <span className={s.checkSpan}>

                    </span>
                    Remember me
                </label>
                {captchaUrl
                 && <div className={s.captcha}>
                        <img src={captchaUrl} alt="captcha"/>
                        <Field type="text" component={Input} validate={emptyForm} name="captcha" placeholder='Captcha'/>
                    </div>}
                {error && <div className={s.formError}>{error}</div>}
                <button type="submit">
                    Submit
                </button>
            </Form>
        )}
    </Formik>
};

export default LoginForm;