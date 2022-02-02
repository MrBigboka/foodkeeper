import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from './Home';
import Login from './Login';
export const UnContexte = React.createContext();

export default function App() {
  return (
    <div className="container">
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}/>
              <Route path="/login" element={<Login/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  );
}
