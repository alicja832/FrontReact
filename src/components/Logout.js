import React, { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { setToken} from './api/TokenService';
import { getToken } from './api/TokenService';

export default function Logout(){
  
  const navigate = useNavigate();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  useEffect(() => {
   
    if(getToken())
    {	
    	setInfoWindowShown(true);
      setTimeout(() => {
        setInfoWindowShown(false);
      }, 3000);
    
      setToken(null);
    
    }
    navigate("/");
  },[]);
  
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }
  //tutaj będzie trzeba coś zmienić
  return (
   <div></div>
  );
};


