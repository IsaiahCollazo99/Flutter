import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route, Switch } from 'react-router-dom';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import { AuthRoute, ProtectedRoute } from './util/routesUtil';

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

                <ProtectedRoute path={"/:userName"}>
                    <Profile />
                </ProtectedRoute>


                <Route>
                    <div className="notFound">
                        404 Page Not Found
                    </div>
                </Route>
            </Switch>

        </div>
    )
}

export default App;