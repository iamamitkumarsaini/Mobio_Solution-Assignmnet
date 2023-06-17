import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./Homepage";
import Cartpage from "./Cartpage";
import Login from "./Login";
import Signup from "./Signup";
import PrivateRoute from "./PrivateRoute";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />}></Route>
      <Route
        path="/cart"
        element={
          <PrivateRoute>
            <Cartpage />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
    </Routes>
  );
}

export default AllRoutes;
