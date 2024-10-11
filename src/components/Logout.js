import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MyParticles  from './MyParticles'
import { setLogin } from './api/TokenService';
import { getLogin } from './api/TokenService';
import { Box } from "@mui/material";

export default function Logout(){
  
  //tu trzeba zrobic ze: pomyślnie wylogowano!
  const navigate = useNavigate();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  useEffect(() => {
    
    if(getLogin())
    {	
    	setInfoWindowShown(true);
      setTimeout(() => {
        setInfoWindowShown(false);
      }, 3000);
      setLogin(null);
    }
    navigate("/register");
  },[]);
  
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }
  
  return (
    <MyParticles>
    <h1>Cos nudnego</h1>
    <div>
     <Box display="flex" flexDirection="column" gap={2}>
                  {infoWindowShown && <Toast message="Pomyślnie wylogowano!" />}
     </Box>
     </div>
    </MyParticles>
  );
};


