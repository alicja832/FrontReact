import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken} from './api/TokenService';

export default function Logout(){
  
  const navigate = useNavigate();
  const timeout = 4000;
  useEffect(() => {
      setToken(null);  
    navigate("/");
  },[]);
  
 
  return (
   <div></div>
  );
};


