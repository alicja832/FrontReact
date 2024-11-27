import React, { useEffect, useState } from "react";
import TeacherProfile from "./TeacherProfile";
import {getToken} from "./api/TokenService"
import StudentProfile from "./StudentProfile";

const Profile = () => {

  const [user, setUser] = useState(null);
  
  useEffect(() => {
    //fetch("https://naukapythona.azurewebsites.net/user/"
    fetch("http://localhost:8080/user/",{
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setUser(result[0]);
      }).catch((error)=>{
        console.log(error);
      });
  },[]);

  return (
   
    <div>
      {user!==null && user.score === undefined && <TeacherProfile user={user} />}
      {user!==null && user.score >= 0 && <StudentProfile user={user} />}
    </div>
  );
};

export default Profile;
