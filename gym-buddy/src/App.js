import React from 'react';
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar"
import { Route, Routes } from "react-router-dom";
import Home from './components/Home/Home';
import Help from './components/Help/Help';
import NewReservation from './components/NewReservation/NewReservation';
import MyReservation from './components/MyReservation/MyReservation';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Admin from './components/Admin/Admin';
import { AuthProvider } from "./components/auth";
import RequireAuth from "./components/RequireAuth"

function App() {

  return(
  <AuthProvider>
    <ResponsiveAppBar />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/help" element={<RequireAuth><Help/></RequireAuth>} />
        <Route path="/newreservation" element={<RequireAuth><NewReservation/></RequireAuth>} />
        <Route path="/myreservation" element={<RequireAuth><MyReservation /></RequireAuth>} />
        {/* <Route path="/help" element={(username) ? <Help/> : <Login/>} />
        <Route path="/newreservation" element={(username) ? <NewReservation/> : <Login/>} />
        <Route path="/myreservation" element={(username) ? <MyReservation/> : <Login/>} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<RequireAuth><Admin /></RequireAuth>} />
        {/* <Route path="/admin" element={(username) ? <Admin /> : <Login/>} /> */}
    </Routes>
  </AuthProvider>
  )


}

export default App;
