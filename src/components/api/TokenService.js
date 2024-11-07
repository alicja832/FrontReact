
export function getToken(){
  console.log( window.localStorage.getItem('token'));
  return window.localStorage.getItem('token');
}

export function setToken(token) {
    
    window.localStorage.removeItem('token');
    
    if(token!==null)
    {
      window.localStorage.setItem('token',token);
     
      window.location.reload();
    }
    
    else
    {
      window.localStorage.removeItem('token');
      window.location.reload();
    }

    return;
  }
  