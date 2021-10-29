import React, {FC} from "react";
import {connect} from "react-redux";
import {Redirect} from "react-router-dom";
import {AppStateType} from "../redux/reduxStore";

let mapStateToPropsRedirect = (state: AppStateType) => ({
    isAuth: state.auth.isAuth,
});
type MapStatePropsType = {
    isAuth: boolean
};

export function withAuthRedirecting<CProps>(Component: React.ComponentType<CProps>) {
    const withAuthRedirectContainer: FC<CProps & MapStatePropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Redirect to={'/login'}/>;
        return <Component {...restProps as CProps}/>;
    };

    // @ts-ignore
    return connect(mapStateToPropsRedirect, {})(withAuthRedirectContainer);
}