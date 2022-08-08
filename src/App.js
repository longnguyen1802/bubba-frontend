import React from 'react';
import { BrowserRouter as Router, Link ,Switch} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Search from './pages/Search';
import Navbar from './components/Navbar';
import SearchResultImage from './pages/SearchResultImage';
import ImageDetail from './pages/ImageDetail';
import SearchResultAlbum from './pages/SearchResultAlbum';
import AlbumContent from './pages/AlbumContent';

function App() {
    return (
      <>
        <div className='main-container'>
          <Navbar />
          <Routes>
            <Route element={<Home />} path="/" />
            <Route element={<Upload />} path="/upload" />
            <Route element={<Search />} path="/search" />
            <Route element={<SearchResultImage />} path="/search/result" />
            <Route element={<ImageDetail />} path="/search/result/image" />
            <Route element={<SearchResultAlbum />} path="/search/result/album" />
            <Route element={<AlbumContent />} path="/search/result/album/content" />
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
