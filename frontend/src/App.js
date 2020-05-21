import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route } from 'react-router-dom';
import LogIn from './components/Login/LogIn';

function App() {
    return (
        <div className="App">
            <NavBar />
            <Route exact path={"/"}>
                <FeedPage />
            </Route>

            <Route path={"/login"}>
                <LogIn />
            </Route>
            
        </div>
    )
}

export default App;