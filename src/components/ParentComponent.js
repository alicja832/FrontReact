import React, { useState,useEffect } from 'react';
import DrawerAppBar from './DrawerAppBar';
import Register from './Register';
import { getToken } from './api/TokenService'; 

export default function ParentComponent() {
   
  const [navItems,setNavItems] = useState(['Zadania', 'Główna','Zaloguj','Zarejestruj']);
  const [purposes,setPurposes] = useState(["/tasks","/","/login","/register"]);
  const [register, setRegister] = useState('');
  
  
  useEffect(()=>{
    if(getToken() && !navItems.includes('Profil'))
    {
        console.log("Profil add");
        navItems.unshift('Profil');
        purposes.unshift("/profil");
        navItems.push("Wyloguj");
        purposes.push("/logout");
        setNavItems(navItems.filter((element) => element!=='Zaloguj'&& element!=='Zarejestruj'));
        setPurposes(purposes.filter((element) => element!=="/login" && element!=="/register"));
        console.log(navItems);
    }
    else if(!getToken() && navItems.includes('Profil'))
      {
        console.log("Profil remove");
        navItems.push("Zaloguj");
        purposes.push("/login");
        navItems.push("Zarejestruj");
        purposes.push("/register");
        setNavItems(navItems.filter((element) => element!=='Profil'&& element!=='Wyloguj'));
        setPurposes(purposes.filter((element) => element!=="/profil" && element!=="/logout"));
        console.log(navItems);
      }
  })
  
    function changeProperties()
    {
      if(getToken() && !navItems.includes('Profil'))
        {
            console.log("Profil add");
            navItems.unshift('Profil');
            purposes.unshift("/profil");
            navItems.push("Wyloguj");
            purposes.push("/logout");
            setNavItems(navItems.filter((element) => element!=='Zaloguj'&& element!=='Zarejestruj'));
            setPurposes(purposes.filter((element) => element!=="/login" && element!=="/register"));
            console.log(navItems);
            setRegister("fff");
          }
        else if(!getToken() && navItems.includes('Profil'))
          {
            console.log("Profil remove");
            navItems.push("Zaloguj");
            purposes.push("/login");
            navItems.push("Zarejestruj");
            purposes.push("/register");
            setNavItems(navItems.filter((element) => element!=='Profil'&& element!=='Wyloguj'));
            setPurposes(purposes.filter((element) => element!=="/profil" && element!=="/logout"));
            console.log(navItems);
          } 
    }

  return (
    <div>
      <DrawerAppBar register = {register}/> 
      <Register changeProperties={changeProperties}/>
      </div>
  );
}