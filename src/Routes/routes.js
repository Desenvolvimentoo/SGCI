import React, { Fragment } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import FormCaldeira from '../Pages/FormCaldeira';
import FormParadas from '../Pages/FormParadas';
import FormCavaco from '../Pages/FormCavaco';
import Home from '../Pages/Home'

const RoutesApp = () => {

  return (
    <BrowserRouter>
      <Fragment>
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/formCaldeira' element={<FormCaldeira />} />
          <Route path='/iStop' element={<FormParadas/>}/>
          <Route path='/formCavaco' element={<FormCavaco/>}/>
        </Routes>
      </Fragment>
    </BrowserRouter>
  );
};

export default RoutesApp;
