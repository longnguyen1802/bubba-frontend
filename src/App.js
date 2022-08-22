import React from 'react';
import { BrowserRouter as Router, Link ,Switch} from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import Upload from './pages/Upload';
import Home from './pages/Home';
import Search from './pages/Search';
import Navbar from './components/navbar/Navbar';
import Album from './pages/Album';
import SearchResultImage from './pages/SearchResultImage';
import ImageDetail from './pages/ImageDetail';
import SearchResultAlbum from './pages/SearchResultAlbum';
import {DataContextProvider} from './context/dataContext';
import SearchResultFace from './pages/SearchResultFace';
import Success from './pages/payment/Success';
import Cancel from './pages/payment/Cancel';
function App() {
    return (
      <>
        <div className='main-container'>
          <Navbar />
          <DataContextProvider>
            <Routes>
              <Route element={<Upload />} path="/upload" />
              <Route element={<Album/>} path="/album/:id"/>
              <Route element={<Search />} path="/search" />
              <Route element={<SearchResultFace />} path="/search/result/face" />
              <Route element={<SearchResultImage />} path="/search/result" />
              <Route element={<ImageDetail />} path="/search/result/image/:albumId/:id" />
              <Route element={<SearchResultAlbum />} path="/search/result/album" />
              <Route element={<Success/>} path="/facesearch" />
              <Route element={<Cancel/>} path="/payment/cancel"/>
              <Route element={<Home />} path="/" />
            </Routes>
          </DataContextProvider>
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
