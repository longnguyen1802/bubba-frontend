import React from 'react';
import './App.css';
import { BrowserRouter as Router, Link, Switch, Route } from 'react-router-dom';
import Upload from './pages/Upload.js';
import Home from './pages/Home.js';
import FacereCognition from './pages/FaceRecognition.js';
function App() {
    return (
        <div className="container">
            <Router>
                <nav className="nav">
                    <div className="nav-brand">Bubba Demo</div>
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/upload">Upload</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/facerecognition">Face Recognition</Link>
                        </li>
                    </ul>
                </nav>
                <Switch>
                    <Route component={Upload} path="/upload" />
                    <Route component = {FacereCognition} path = '/facerecognition' />
                    <Route component={Home} path="/" />
                    
                </Switch>
            </Router>
        </div>
    );
}

export default App;
