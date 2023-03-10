import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"

// pages
import CustomNavbar from './components/navbar.component';
import Home from './components/home.component';
import Art from './components/art.component';
import Games from './components/games.component';
import PageNotFound from './components/page-not-found.component';
import Rigging from './components/rigging.components';
import Shaders from './components/shaders.component';
import TechnicalArt from './components/technical-art.component';

function App() {
  return (
    <div className='container shadow-lg'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CustomNavbar />}>
            <Route index element={<Home />} />
            <Route path='/Art' element={<Art />}/>
            <Route path='/Games' element={<Games />}/>
            <Route path='/Rigging' element={<Rigging />}/>
            <Route path='/Shaders' element={<Shaders />}/>
            <Route path='/Technical-Art' element={<TechnicalArt />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
