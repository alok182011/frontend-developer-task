import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./App.css";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";

function App() {
  return (
    <Box width="100vw" height="100vh" fontFamily="Inter">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
