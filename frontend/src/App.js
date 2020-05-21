import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route } from 'react-router-dom';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import AuthProvider from './providers/AuthContext';

function App() {
    return (
        <div className="App">
        <AuthProvider>
            <NavBar />
            <Route exact path={"/"}>
                <FeedPage />
            </Route>

            <Route path={"/login"}>
                <LogIn />
            </Route>

            <Route path={"/profile"}>
                <Profile />
            </Route>
        </AuthProvider>
            
            
        </div>
    )
}

export default App;