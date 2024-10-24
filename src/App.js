
  // import { Menu } from '@mui/material';
  import './App.css';
  import { BrowserRouter as Router, Route, Routes,useParams } from 'react-router-dom';
  import Home from './components/Home';
  import Register from './components/Register';
  import Profile from './components/Profile';
  import Exercise from './components/Exercise';
  import Login from './components/Login';
  import DrawerAppBar from './components/DrawerAppBar';
  import TeacherProfile from './components/TeacherProfile';
  import StudentProfile from './components/StudentProfile';
  import Solution from './components/Solution';
  import SolutionRetake from './components/SolutionRetake';
  import PasswordReminder from './components/Password';
  import Ranking from './components/Ranking';
  import Logout from './components/Logout';

  function App() {
   
    return (
    
      <Router>
      <div>
      <DrawerAppBar/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>} /> 
          <Route path="/register"element={<Register/>} />
          <Route path="/profil" element={<Profile/>} />
          <Route path="/ranking" element={<Ranking/>} />
          <Route path="/tasks" element={<Exercise/>} />
          <Route path="/teacherprofil" element={<TeacherProfile/>} />
          <Route path="/studentprofil" element={<StudentProfile/>} />
          <Route path="/solution/:id" element={<SolutionWrapper/>} />
          <Route path="/password" element={<PasswordReminder/>} />
          <Route path="/solutionRetake/:id" element={<SolutionRetakeWrapper/>} />
          <Route path="/logout" element={<Logout/>} />
        </Routes>
      </div>
    </Router>
    );
  }
  function SolutionWrapper() {
    const { id } = useParams();
    return <Solution task={id.charAt(1)} />;
  }

  function SolutionRetakeWrapper() {
    const { id } = useParams();
    return <SolutionRetake task={id.charAt(1)} />;
  }
  
  export default App;
