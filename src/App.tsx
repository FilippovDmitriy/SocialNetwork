import './App.css';
import React, {FC, useEffect} from 'react';

import HeaderContainer from "./components/Header/HeaderContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersPage from "./components/Users/UsersPage";
import Navigation from "./components/Navigation/Navigation";
import News from './components/News/News';
import Music from "./components/Music/Music";

import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {compose} from "redux";
import {connect} from "react-redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import withSuspense from "./hoc/withSuspense";
import LoginContainer from "./components/Login/LoginContainer";
import {AppStateType} from "./redux/reduxStore";
import Chat from "./components/Chat/Chat";

const Settings = React.lazy(() => import("./components/Settings/Settings"));

type MapStateToProps = {
    initialized: boolean
};
type MapDispatch = {
    initializeApp: () => void
};
type Props = MapStateToProps & MapDispatch;

const App: FC<Props> = (props) => {
    useEffect(() => {
        props.initializeApp();
    });

    if (!props.initialized) {
        return <Preloader/>
    }

    return (
        <BrowserRouter>
            <div className='wrapper'>
                <HeaderContainer/>
                <Navigation/>
                <main className='main'>
                    <Switch>
                        <Route path='/profile/:userId?' render={ () => <ProfileContainer/>} />
                        <Route path='/dialogs' render={ () => <DialogsContainer/>} />
                        <Route path='/chat' render={ () => <Chat/>} />
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/users' render={ () => <UsersPage/>}/>
                        <Route path='/settings' render={withSuspense(Settings)}/>
                        <Route path='/login' render={() => <LoginContainer/>}/>
                        <Redirect from='/' to='/profile'/>
                    </Switch>
                </main>
            </div>
        </BrowserRouter>
    );
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

export default compose<React.ComponentType>(
    connect(mapStateToProps, {initializeApp})
)(App);
