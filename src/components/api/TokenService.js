import Home from "../Home";
export function getToken() {
  const token = window.localStorage.getItem("token");
  console.log(token);
  console.log( new Date(window.localStorage.getItem("expiration-date")))
  if (
    token &&
    new Date().getTime() >=
      new Date(window.localStorage.getItem("expiration-date")).getTime()
  ) {
    console.log("halo");
    const refreshToken = window.localStorage.getItem("refresh-token");
    fetch("http://localhost:8080/user/refresh-token", {
      headers: { Authorization: `Bearer ${refreshToken}` },
      method: "GET",
    }).then((res) => {
      if (!res.ok) {
       setToken(null);
        return <Home/>;
      } else {
        const promise1 = Promise.resolve(res.body.getReader().read());
        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const token = decoder.decode(value.value);
          const token_dict = JSON.parse(token);
          console.log(token);
          setToken(token_dict["jwtToken"]);
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
    window.location.reload();
  } else {
    window.localStorage.removeItem("token");
    setExpirationDate(null);
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
