import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyParticles } from './MyParticles'
import { getRole } from "./api/TokenService";
const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
     const role = getRole();
     if (role === "Teacher") {
      navigate('/teacherprofil');
    } else {
      navigate('/studentprofil');
    }
},[navigate]);

  return <div>Loading...</div>;
};

export default Profile;
