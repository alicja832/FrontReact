export function getToken() {
  var token = window.localStorage.getItem("token");
  if (
    token &&
    new Date().getTime() >=
      new Date(window.localStorage.getItem("expiration-date")).getTime()
  ) {
    console.log("halo");
    fetch("http://localhost:8080/user/token", {
      method: "GET",
      credentials:'include'
    }).then((res) => {
      if (!res.ok) {
       
      } else {
        const promise1 = Promise.resolve(res.body.getReader().read());
        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const tokenvalue = decoder.decode(value.value);
          const token_dict = JSON.parse(tokenvalue);
          token = token_dict["token"];
          setToken(token);
        });
      }
    }).catch((error)=>{
      console.log("Error occured:"+ error);
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
    window.location.reload();
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
