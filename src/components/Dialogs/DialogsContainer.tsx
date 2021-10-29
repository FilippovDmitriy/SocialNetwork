import {actions} from "../../redux/dialogsReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import {compose} from "redux";
import {withAuthRedirecting} from "../../hoc/withAuthRedirecting";
import {AppStateType} from "../../redux/reduxStore";
import {MessageType, PersonType} from "../../types/types";
import React from "react";

type MapStateToPropsType = {
    personsData: Array<PersonType>,
    messagesData: Array<MessageType>,
};
type MapDispatchToPropsType = {
    addMessage: (text: string) => void
};
type OwnPropsType = {};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        personsData: state.dialogsPage.personsData,
        messagesData: state.dialogsPage.messagesData,
    }
};

export default compose<React.ComponentType>(
    connect<MapStateToPropsType, MapDispatchToPropsType, OwnPropsType, AppStateType>(mapStateToProps,
        {addMessage: actions.addMessage}),
    withAuthRedirecting,
)(Dialogs);