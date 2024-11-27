import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box } from "@mui/material";
import { FilledInput, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { classInfo } from "./semi-components/MyParticles";
import {
  setToken,
  setRefreshToken,
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState([]);
  const [psw, setPsw] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [errorWindowShown, seterrorInfoWindowShown] = useState(false);
  const timeout = 3000;
  const handleShowPsw = () => setPsw((show) => !show);
  const handleHidePsw = (e) => {
    e.preventDefault();
  };
  const classes = useStyles();
  const navigate = useNavigate();

  const validateData = () => {
    if (!email.includes("@")) {
      seterrorMessage("Podano zły adres email");
      seterrorInfoWindowShown(true);
      setTimeout(() => {
        seterrorInfoWindowShown(false);
      }, 3000);
      throw new Error(`Podano zły adres email!`);
    }
  };
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  const loginClicked = async (event) => {
    event.preventDefault();
    classInfo.setmessage(false);
    const student = { name, email, password };
    try {
      validateData();
    } catch (error) {
      return;
    }
    fetch("http://localhost:8080/user/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    }).then((res) => {
      if (res.ok) {
        const promise1 = Promise.resolve(res.body.getReader().read());

        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const token = decoder.decode(value.value);
          const token_dict = JSON.parse(token);
          setInfoWindowShown(true);
          setToken(token_dict["token"]);
          setExpirationDate(token_dict["jwtExpirationDate"]);
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, timeout);
          setTimeout(() => {
            window.location.reload();
            navigate("/profil");
          }, timeout);
        });
      } else {
        const promise1 = Promise.resolve(res.body.getReader().read());
        console.log(promise1);
        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const text = decoder.decode(value.value);
          console.log(text);
          seterrorMessage(text);
          seterrorInfoWindowShown(true);
          setTimeout(() => {
            seterrorInfoWindowShown(false);
          }, 3000);
        });
      }
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <div style={{ fontSize: "large", marginBottom: "8%" }}>
              <img
                src={"/logo.svg"}
                alt="Logo"
                style={{
                  height: "3%",
                  verticalAlign: "middle",
                }}
              />
              Nauka Pythona
            </div>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
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
              <TextField
                id="outlined-basic"
                label="Adres e-mail"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                sx={{ marginBottom: "16px" }}
              />
              <FilledInput
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
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#001f3f" }}
                    onClick={loginClicked}
                  >
                    Zaloguj
                  </Button>
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  {infoWindowShown && <Toast message="Zalogowano!" />}
                  {errorWindowShown && <Toast message={errorMessage} />}
                </Box>
              </div>
              <Box display="flex" flexDirection="column" gap={2}>
                <NavLink to="/password">Zapomniałeś hasła?</NavLink>
              </Box>
            </form>
          </Paper>
        </Container>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
