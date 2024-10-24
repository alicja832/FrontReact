import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box } from "@mui/material";
import { FilledInput, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { Select, InputLabel, FormControl } from "@mui/material";
import { setLogin,setRole,getRole } from "./api/TokenService";
import MyParticles from "./MyParticles";
import {classInfo} from "./MyParticles";
const useStyles = makeStyles((theme) => ({}));

export default function Register(props) {
  const paperStyle = {
    top: "4em",
    padding: "4% 4%",
    width: "40%",
    margin: "1% auto",
    gap: "1%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    textAlign: "center"
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [psw, setPsw] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  
  const handleShowPsw = () => setPsw((show) => !show);
  const handleHidePsw = (e) => {
    e.preventDefault();
  };
  const classes = useStyles();
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [errorWindowShown, seterrorInfoWindowShown] = useState(false);

  const register = (e) => {
    
    e.preventDefault();
    classInfo.setmessage(false);
    const student = { name, email, password };
    
    if (!email.includes("@")) {
      seterrorMessage("Podano zły adres email");
      seterrorInfoWindowShown(true);
      setTimeout(() => {
        seterrorInfoWindowShown(false);
      }, 3000);
      return;
    }
    if (password!==passwordConfirm) {
      seterrorMessage("Podane hasła różnią się");
      seterrorInfoWindowShown(true);
      setTimeout(() => {
        seterrorInfoWindowShown(false);
      }, 3000);
      return;
    }
    const url =
      roles === 1
        ? "http://localhost:8080/user/teacher"
        : "http://localhost:8080/user/student";

    fetch(url, {
      
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    
    }).then((response) => {
      

      
      if (!response.ok) {
        
        const promise1 = Promise.resolve(response.body.getReader().read());

        promise1.then((value) => {
          const decoder = new TextDecoder("utf-8");
          const text = decoder.decode(value.value);
          seterrorMessage(text);
        });
        console.log("cos");
        setInfoWindowShown(false);
        seterrorInfoWindowShown(true);
        setTimeout(() => {
          seterrorInfoWindowShown(false);
        }, 3000);
      } else {
        console.log("ktos");
      
        
        setInfoWindowShown(true);
        setTimeout(() => {
          setInfoWindowShown(false);
            setLogin(email);
   
        if(roles === 1)
        	setRole("Teacher");
        else setRole("Student");
          setName("");
          setEmail("");
          setPassword("");
          setPasswordConfirm("");
        
        }, 3000);
        
      
      }
    }).catch((error)=>
    {
      console.log(error);
    	classInfo.setmessage(false);
    	seterrorMessage("Błąd połączenia");
        setInfoWindowShown(false);
        seterrorInfoWindowShown(true);
        setTimeout(() => {
          seterrorInfoWindowShown(false);
        }, 3000);
    });
  };
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div>
      <MyParticles></MyParticles>
      <div id="sthelse">
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <div style = {{fontSize:"large"  ,marginBottom:"8%"}}>
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
                onChange={(e) =>{ setName(e.target.value);
                	if(e.target.value!=='')
                		classInfo.setmessage(true);
                }}
                sx={{ marginBottom: "16px", 
                  '&.Mui-focused fieldset': {
                    borderColor: 'red' 
                  }
                }}
              />
              <TextField
                id="outlined-basic"
                label="Adres e-mail"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                <FilledInput
                value={passwordConfirm}
                placeholder="Potwierdzenie hasła"
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
              <div><p>Wybierz, jaką rolę będziesz pełnić:</p></div>
              <FormControl fullWidth>
                <InputLabel id="role-label">Rola</InputLabel>
                <Select
                  labelId="role-label"
                  value={roles}
                  sx={{ marginBottom: "16px" }}
                  onChange={(e) => setRoles(e.target.value)}
                >
                  <MenuItem value={0}>Uczeń</MenuItem>
                  <MenuItem value={1}>Nauczyciel</MenuItem>
                </Select>
              </FormControl>
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
                    onClick={register}
                  >
                    Zarejestruj
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
                  {infoWindowShown && <Toast message="Zarejestrowano!" />}
                  {errorWindowShown && <Toast message={errorMessage} />}
                </Box>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
    </div>
  );
}
