import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';
import { Route, Switch, useHistory } from 'react-router-dom';
import LogIn from './components/Login/LogIn';
import Profile from './components/Profile/Profile';
import { AuthRoute, ProtectedRoute } from './util/routesUtil';
import DisplayPost from './components/General/DisplayPost';
import Discover from './components/General/Discover';
import SearchPage from './components/SearchPage/SearchPage';

function App() {
    const history = useHistory();
    
    const handleSearch = (search) => {
        let encodedSearch = encodeURIComponent(search);
        history.push("/search?search=" + encodedSearch);
    }
    
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

                <Route path={"/search"}>
                    <SearchPage handleSearch={handleSearch} />
                </Route>

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

            <Discover handleSearch={handleSearch}/>

        </div>
    )
}

export default App;