import React from 'react';
import { BrowserRouter as Router, Link ,Switch} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Home from './pages/Home';
import More from './pages/More';
import Navbar from './components/Navbar';

function App() {
    return (
      <>
        <div className='main-container'>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Upload />} path="/upload" />
            <Route element={<More />} path="/more" />
          </Routes>
        </div>
      </>
      
    );
        {/*  <div className="container">
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
                    </ul>
                </nav>
                <Switch>
                    <Route component={Upload} path="/upload" />
                    <Route component={Home} path="/" />
                </Switch>
            </Router>
        </div> */}
    
}

export default App;
