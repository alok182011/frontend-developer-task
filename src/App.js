import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./App.css";

import Login from "./pages/Login/Login";

function App() {
  return (
    <Box width="100vw" height="100vh" fontFamily="Inter">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
