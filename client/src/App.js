import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./CSS/app.css"

// Pages of Website
import Root from './components/root.component';
import Home from './components/home.component';
import Art from './components/art.component';
import Games from './components/games.component';
import PageNotFound from './components/page-not-found.component';
import Rigging from './components/rigging.components';
import Shaders from './components/shaders.component';
import TechnicalArt from './components/technical-art.component';
import Programming from './components/programming.component';
import ScrollToTop from './scroll-to-top';

function App() {
  return (
    <div className='page'>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path='/' element={<Root />}>
            <Route index element={<Home />} />
            <Route path='/Art' element={<Art />}/>
            <Route path='/Game' element={<Games />}/>
            <Route path='/Rigging' element={<Rigging />}/>
            <Route path='/Shaders' element={<Shaders />}/>
            <Route path='/Technical-Art' element={<TechnicalArt />}/>
            <Route path='/Programming' element={<Programming />}/>
            <Route path='*' element={<PageNotFound />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
