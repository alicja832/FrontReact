import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import DrawerAppBar from "./components/semi-components/DrawerAppBar";
import Footer from "./components/semi-components/Footer";
import AppPanel from "./components/semi-components/AppPanel";
import MyParticles from "./components/semi-components/MyParticles";
function App() {
  return (
    <Router>
      <DrawerAppBar />
      <MyParticles />
      <AppPanel />
      <Footer />
    </Router>
  );
}

export default App;
