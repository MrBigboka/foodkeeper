import React, { useState } from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Menu from './components/Menu'
import Register from './Register';
import Footer from './components/Footer'
import ListeRestaurants from "./ListeRestaurants";
import DetailRestaurant from "./DetailRestaurant";

export const TokenContext = React.createContext();

export default function App() {
  const [token, setToken] = useState("")
  const states = {token, setToken}

  return (
    <div className="container">
      <BrowserRouter>
        <TokenContext.Provider value={states}>
          <Menu/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/liste" element={<ListeRestaurants/>} />
              <Route path="/detailresto/:RestaurantId" element={<DetailRestaurant/>}/>
          </Routes>
          <Footer/>
          </TokenContext.Provider>
      </BrowserRouter>
    </div>
  );
}
