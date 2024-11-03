export function getLogin(){
    return window.localStorage.getItem('login');
}

export function getRole(){
  return window.localStorage.getItem('role');
}

export function getToken(){
  return window.localStorage.getItem('token');
}


export function setLogin(login) {
    if (login !== null) {
      
      window.localStorage.setItem('login', login);
      window.location.reload();
    
    } else {
      
      window.localStorage.removeItem('login');
      window.location.reload();
    
    }
    return;
}

export function setRole(role) {

  if (role !== null) {
    window.localStorage.setItem('role', role);
  } else {
    window.localStorage.removeItem('role');
  }
  return;
}

export function setToken(token) {
    
    window.localStorage.removeItem('token');
    if(token!==null)
    {
      window.localStorage.setItem('token',token);
    }
    else
    {
      window.localStorage.removeItem('token');
    }

    return;
  }
  