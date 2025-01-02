import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken} from './api/TokenService';


export default function Logout(){
  
  const navigate = useNavigate();
  useEffect(() => {
    setToken(null);  
    navigate("/");
    window.alert("Wylogowano");
    window.location.reload(); 
  },[]);
  
 
  return (
   <div></div>
  );
};


