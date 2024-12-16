import React, { useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken,getToken} from './api/TokenService';


export default function Logout(){
  
  const navigate = useNavigate();
  const timeout = 4000;
  useEffect(() => {
      setToken(null);  
    navigate("/");
    window.location.reload(); 
    window.alert("Wylogowano");
  },[]);
  
 
  return (
   <div></div>
  );
};


