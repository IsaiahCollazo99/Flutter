import React, { useContext } from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route, Redirect } from 'react-router-dom';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import AuthProvider, { AuthContext } from './providers/AuthContext';

function App() {
    const { currentUser } = useContext(AuthContext);

    const displayPage = () => {
        if(currentUser) {
            return (
                <>
                    <NavBar />
                    <Route exact path={"/"}>
                        <FeedPage />
                    </Route>
    
                    <Route path={"/profile"}>
                        <Profile />
                    </Route>
                </>
            )
        } else {
            return (
                <>
                    <Redirect from="/" to="/login" />
                    <Route path={"/login"}>
                        <LogIn />
                    </Route>
                </>
            )
        }
    }
    
    return (
        <div className="App">
            {displayPage()}
        </div>
    )
}

export default App;