import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box, CircularProgress } from "@mui/material";
import { FilledInput, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { classInfo } from "./semi-components/MyParticles";
import {
  setToken,
  setExpirationDate,
} from "./api/TokenService";
import Footer from "./semi-components/Footer";

const useStyles = makeStyles(() => ({}));

export default function Login() {
  const paperStyle = {
    top: "5em",
    padding: "4% 4%",
    width: "40%",
    margin: "1% auto",
    gap: "1%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    textAlign: "center",
  };

  const [name, setName] = useState("");
  const [password, setPassword] = useState([]);
  const [psw, setPsw] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const timeout = 3000;
  const handleShowPsw = () => setPsw((show) => !show);
  const handleHidePsw = (e) => {
    e.preventDefault();
  };
  const classes = useStyles();

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  const loginClicked = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    classInfo.setmessage(false);
    const student = { name, password };
    try {
    
    const firstResponse = await fetch(`${process.env.REACT_APP_API_URL}/user/authenticate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    });
    if (!firstResponse.ok) {
      const errorText = await firstResponse.text();
      console.log(errorText);
      throw new Error(errorText || "Logowanie nie powiodło się");
    }
    const data = await firstResponse.json();
      setToken(data.token);
      setExpirationDate(data.jwtExpirationDate);
      console.log(data.jwtExpirationDate);
      const url = `${process.env.REACT_APP_API_URL}/user/refreshtoken`;
      
      const refreshToken = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${data.token}` }, credentials:'include'
      });
      if (!refreshToken.ok) {
        throw new Error("Błąd logowania. Spróbuj ponownie.");
      }
      setIsLoading(false);
      setInfoWindowShown(true);
      setTimeout(() => {
        setInfoWindowShown(false);
      }, timeout);
      window.location.reload();

    } catch (error) {
      console.log(error);
      if(error.message==="Failed to fetch")
        setErrorMessage("Błąd połączenia");
      else
        setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
        setIsLoading(false);
      }, 2*timeout);
    }
    
  };
  return (
    <div className="main-container">
     <div className="first-container">
        <Container>
          <Paper elevation={3} style={paperStyle}>
          <div className="img-box">
              <img
                src={"/logo.svg"}
                alt="Logo"
                className="logo"
              />
              Nauka Pythona
            </div>
            <form className={classes.root} noValidate autoComplete="off" >
              <TextField
                id="name"
                label="Nazwa użytkownika"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (e.target.value !== "") {
                    classInfo.setmessage(true);
                  }
                }}
                sx={{
                  marginBottom: "16px",
                  "&.Mui-focused fieldset": {
                    borderColor: "red",
                  },
                }}
              />
              <FilledInput
                id="password"
                value={password}
                placeholder="Hasło"
                onChange={(e) => setPassword(e.target.value)}
                type={psw ? "text" : "password"}
                fullWidth
                sx={{ marginBottom: "16px" }}
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton
                      onClick={handleShowPsw}
                      onMouseDown={handleHidePsw}
                      edge="end"
                    >
                      {psw ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                 {
                  !isLoading &&  <Button
                    variant="contained"
                    style={{ backgroundColor: "#001f3f" }}
                    onClick={loginClicked}
                  >
                    Zaloguj
                  </Button>
                  }
                  { isLoading && 
                    <CircularProgress size={24}/>
                  }
                </Box>
              </div>
              <div className = "info-box">
                <Box display="flex" flexDirection="column" gap={2}>
                  {infoWindowShown && <Toast message="Zalogowano!" />}
                  {errorMessage&& <Toast message={errorMessage} />}
                </Box>
              </div>
              <Box display="flex" flexDirection="column" gap={2}>
                <NavLink to="/password">Zapomniałeś hasła?</NavLink>
              </Box>
            </form>
          </Paper>
        </Container>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
