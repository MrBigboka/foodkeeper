import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Menu from './components/Menu'
import Register from './Register';
import Footer from './components/Footer'
import ListeRestaurants from "./ListeRestaurants";
export const UnContexte = React.createContext();

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
          <Menu/>
          <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register/>}/>
              <Route path="/liste" element={<ListeRestaurants/>} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}
