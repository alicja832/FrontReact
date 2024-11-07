import React, { useEffect, useState } from "react";
import MyParticles  from "./MyParticles";
import TeacherProfile from "./TeacherProfile";
import {getToken} from "./api/TokenService"
import StudentProfile from "./StudentProfile";

const Profile = () => {

  const [user, setUser] = useState(null);
  //tutaj trzeba to naprawić niestety
  useEffect(() => {
    fetch("http://localhost:8080/user/", {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result[0]);
      });
  },[]);

  return (
   
    <div>
       <MyParticles></MyParticles>
      {user!==null && user.role === "TEACHER" && <TeacherProfile user={user} />}
      {user!==null && user.role === "STUDENT" && <StudentProfile user={user} />}
    </div>
  );
};

export default Profile;
