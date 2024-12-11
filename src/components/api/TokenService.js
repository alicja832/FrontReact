export function getToken() {
  var token = window.localStorage.getItem("token");
  if (
    token &&
    (new Date().getTime()+10) >=
      new Date(window.localStorage.getItem("expiration-date")).getTime()
  ) {
    console.log("halo");
    fetch("http://localhost:8080/user/token", {
      method: "GET",
      credentials:'include'
    }).then((res) => {
      if (!res.ok) {
       setToken(null);
       window.location.reload();
      } else {
        const promise1 = Promise.resolve(res.body.getReader().read());
        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const tokenvalue = decoder.decode(value.value);
          const token_dict = JSON.parse(tokenvalue);
          token = token_dict["token"];
          window.localStorage.setItem("token", token);
         
        });
      }
    }).catch((error)=>{
      console.log("Error occured:"+ error);
      setToken(null);
    })
  }
  return token;
}

export function setToken(token) {
  window.localStorage.removeItem("token");

  if (token !== null) {
    window.localStorage.setItem("token", token);
  } else {
    setExpirationDate(null);
    setRefreshToken(null);
   
  }

  return;
}
export function getRefreshToken() {
  return window.localStorage.getItem("refresh-token");
}

export function setRefreshToken(refreshToken) {

  window.localStorage.removeItem("refresh-token");

  if (refreshToken !== null) {
    window.localStorage.setItem("refresh-token", refreshToken);
  } else {
    window.localStorage.removeItem("refresh-token");
  }

  return;
}

export function setExpirationDate(expirationDate) {
  window.localStorage.removeItem("expiration-date");

  if (expirationDate !== null) {
    window.localStorage.setItem("expiration-date", expirationDate);
  } else {
    window.localStorage.removeItem("expiration-date");
  }

  return;
}
