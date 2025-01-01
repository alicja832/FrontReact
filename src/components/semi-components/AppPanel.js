import {Route,
  Routes,
  useParams,
} from "react-router-dom";
import Home from "../Home";
import Register from "../Register";
import Profile from "../Profile";
import Exercise from "../Exercise";
import Login from "../Login";
import TeacherProfile from "../TeacherProfile";
import StudentProfile from "../StudentProfile";
import Solution from "../Solution";
import SolutionAbc from "../SolutionAbc";
import SolutionRetake from "../SolutionRetake";
import PasswordReminder from "../Password";
import Ranking from "../Ranking";
import Logout from "../Logout";
import SolutionAbcRetake from "../SolutionAbcRetake";
import React from "react";
function AppPanel() {
  function SolutionRetakeWrapper() {
    const { id } = useParams();
    return <SolutionRetake task={id} />;
  }
  function SolutionRetakeAbcWrapper() {
    const { id } = useParams();
    return <SolutionAbcRetake task={id} />;
  }


  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profil" element={<Profile />} />
      <Route path="/ranking" element={<Ranking />} />
      <Route path="/tasks" element={<Exercise />} />
      <Route path="/teacherprofil" element={<TeacherProfile />} />
      <Route path="/studentprofil" element={<StudentProfile />} />
      <Route path="/solution" element={<Solution />} />
      <Route path="/solutionabc" element={<SolutionAbc />} />
      <Route path="/password" element={<PasswordReminder />} />
      <Route path="/solutionRetake/:id" element={<SolutionRetakeWrapper />} />
      <Route path="/solutionAbcRetake/:id" element={<SolutionRetakeAbcWrapper />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}
export default AppPanel;