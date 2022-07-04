import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import "./App.css";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import PrivateRoute from "./PrivateRoute";
import Thought from "./pages/Thought/Thought";

function App() {
  return (
    <Box width="100%" height="100vh" fontFamily="Inter">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route
            exact
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/profile/:username"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path="/thought/:thought_id"
            element={
              <PrivateRoute>
                <Thought />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
