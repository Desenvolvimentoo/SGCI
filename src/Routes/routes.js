import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormCaldeira from '../Pages/FormCaldeira';
import FormParadas from '../Pages/FormParadas';
import FormCavaco from '../Pages/FormCavaco';
import FormBiodiesel from '../Pages/FormBiodiesel';
import FormCQ from '../Pages/FormCQ';
import FormPCP from '../Pages/FormPCP';
import FormEsmagamento from '../Pages/FormEsmagamento';
import Login from '../Pages/Login';
import Home from '../Pages/Home';
import CadastrarUsuario from '../Pages/CadastrarUsuario';

export const Private = ({ isLoggedIn, Component }) => {
  return isLoggedIn ? <Component /> : <Login />;
}


const RoutesApp = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  return (
    
    <BrowserRouter>
      <Fragment>
        <Routes>
        <Route path='/home' element={<Private isLoggedIn={isLoggedIn} Component={Home} />} />
          <Route path='/formCaldeira' element={<Private isLoggedIn={isLoggedIn} Component={FormCaldeira} />} />
          <Route path='/iStop' element={<Private isLoggedIn={isLoggedIn} Component={FormParadas} />}/>
          <Route path='/formCavaco' element={<Private isLoggedIn={isLoggedIn} Component={FormCavaco} />}/>
          <Route path='/formBiodiesel' element={<Private isLoggedIn={isLoggedIn} Component={FormBiodiesel} />}/>
          <Route path='/formCQ' element={<Private isLoggedIn={isLoggedIn} Component={FormCQ} />}/>
          <Route path='/formPCP' element={<Private isLoggedIn={isLoggedIn} Component={FormPCP} />}/>
          <Route path='/formEsmagamento' element={<Private isLoggedIn={isLoggedIn} Component={FormEsmagamento} />}/>
          <Route path='/cadastrarUsuario' element={<CadastrarUsuario/>}/>
          <Route path='*' element={<Login/>}/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
