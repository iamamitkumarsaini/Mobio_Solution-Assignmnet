import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Homepage from './Homepage';
import Cartpage from './Cartpage';
import Checkout from './Checkout';
import Orderpage from './Orderpage';
import Login from './Login';
import Signup from './Signup';

function AllRoutes() {
    return (
        <Routes>
            <Route path='/' element={<Homepage />}></Route>
            <Route path='/cart' element={<Cartpage />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
            <Route path='/orderpage' element={<Orderpage />}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
        </Routes>
    );
}

export default AllRoutes;