import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import { AuthRoute, ProtectedRoute } from './util/routesUtil';
import DisplayPost from './components/General/DisplayPost';
import Discover from './components/General/Discover';

function App() {
    return (
        <div className="App">
            <NavBar />

            <Switch>
                <Route exact path={"/"}>
                    <FeedPage />
                </Route>

                <AuthRoute path={"/login"}>
                    <LogIn />
                </AuthRoute>

                <ProtectedRoute exact path={"/:userName"}>
                    <Profile />
                </ProtectedRoute>

                <Route path={"/:username/status/:postId"}>
                    <DisplayPost />
                </Route>
                
                <Route>
                    <div className="notFound">
                        404 Page Not Found
                    </div>
                </Route>
            </Switch>

            <Discover />

        </div>
    )
}

export default App;