import {connect} from "react-redux";
import Header from "./Header";
import {logOut} from "../../redux/authReducer";
import {compose} from "redux";
import {AppStateType} from "../../redux/reduxStore";

type MapStateToPropsType = {
    isAuth: boolean
    login: string | null
};
type MapDispatchToPropsType = {
    logOut: () => void
};
type OwnPropsType = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return({
        isAuth: state.auth.isAuth,
        login: state.auth.login,
    });
};

export default compose(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {logOut})
)(Header);