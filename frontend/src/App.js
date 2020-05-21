import React from 'react';
import FeedPage from './components/FeedPage/FeedPage';
import './App.css';
import NavBar from './components/General/NavBar';

function App() {
    return (
        <div className="App">
            <NavBar />
            <FeedPage />
        </div>
    )
}

export default App;