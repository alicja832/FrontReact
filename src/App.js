import "./App.css";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import DrawerAppBar from "./components/semi-components/DrawerAppBar";
import AppPanel from "./components/semi-components/AppPanel";
import MyParticles from "./components/semi-components/MyParticles";


function App() {

  return (        
    <Router>
    <DrawerAppBar/>
    <MyParticles/>
    <AppPanel/>
    </Router>
  );
}

export default App;
