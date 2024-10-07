export function getLogin(){
    return window.localStorage.getItem('login');
}

export function getRole(){
  return window.localStorage.getItem('role');
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
//localStorage.clear(); -> gdzieś to wstawić XD

export function setRole(role) {
console.log(role);
  if (role !== null) {
    window.localStorage.setItem('role', role);
  } else {
    window.localStorage.removeItem('role');
  }
  return;
}
