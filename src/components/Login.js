import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { Container, Paper, Button, Box } from "@mui/material";
import { FilledInput, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import { MenuItem } from "@mui/material";
import { Select, InputLabel, FormControl } from "@mui/material";
import { useNavigate } from "react-router-dom";
import MyParticles from "./MyParticles";
import { NavLink } from "react-router-dom";
import {classInfo} from "./MyParticles";

const useStyles = makeStyles((theme) => ({}));

export default function Login() {

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
  const [role, setRole] = useState("");
  const [password, setPassword] = useState([]);
  const [psw, setPsw] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [errorWindowShown, seterrorInfoWindowShown] = useState(false);

  const handleShowPsw = () => setPsw((show) => !show);
  const handleHidePsw = (e) => {
    e.preventDefault();
  };
  const classes = useStyles();
  const navigate = useNavigate();

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }
  
  


  const loginClicked = async (event) => {
  
  //do ogarnięcia
    classInfo.setmessage(false);
   
    //bla bla 
    //seterrorMessage("Podany uzytkoni")
    //   console.log(credentials);
    //   event.preventDefault();
    //   // setCredentials(name,password)
    //   let errors = validate(credentials);
    //   setErrors(errors);
    //   console.log(errors);
    //   const toSend = JSON.stringify(credentials);
    //   if (Object.keys(errors).length === 0) {
    //     setLoading(true);
    //     const one = credentials.name;
    //     const two = credentials.password;
    //      axios
    //  .post(`http://localhost:8080/user/authenticate`,
    //    credentials
    //   )
    //    .then((res)=>{
    //     if (res != null) {
    //       console.log(res);
    //       const token = res.data.jwtToken;
    //       console.log(token);
    //     // const res = TokenService(
    //     //   credentials.name,
    //     //   credentials.password
    //     // );
    //     // console.log(res.text());
    //     // if (res.status !== 200) {
    //     //   setLoading(false);
    //     //   setLoginState((prevState) => ({ ...prevState, hasLoginFailed: true }));
    //     //   setLoginState((prevState) => ({
    //     //     ...prevState,
    //     //     showSuccessMessage: false,
    //     //   }));
    //     // } else {
    //     //   let jwtToken = res;
    //     //   const token = `Bearer ${jwtToken}`;
    //     //   LoginInformation.setUpToken(token);
    //     let config = {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //     // LoginInformation.setUpToken(token);
    //     axios.post(`http://localhost:8080/user/login`,
    //       credentials,
    //       config
    //      ).then((response)=>{
    //     console.log(response.text);
    //     if (response.status !== 200) {
    //       setLoading(false);
    //       setLoginState((prevState) => ({
    //         ...prevState,
    //         hasLoginFailed: true,
    //       }));
    //       setLoginState((prevState) => ({
    //         ...prevState,
    //         showSuccessMessage: false,
    //       }));
    //     } else if (response.data === "STUDENT") {
    //       // AuthenticationService.registerSuccessfulLoginUser(
    //       //   credentials.name
    //       console.log("Student");
    //       navigate("/studentprofil");
    //     } else if (response.data === "TEACHER") {
    //      console.log("Teacher");
    //       navigate("/teacherprofil");
    //     }
    //   }).catch((error) => {
    //     console.error('Error:', error);
    //   });
    //    }
    //   }).catch((err) => {
    //     console.log(err);
    // })
  };
  return (
    <div>
      <MyParticles></MyParticles>
      <div id="sthelse">
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <div style = {{fontSize:"large",marginBottom:"8%"}}>
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
                        setName(e.target.value)
                        if(e.target.value!==''){
                		classInfo.setmessage(true);
                	}
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
                onChange={(e) => {
                	setEmail(e.target.value)
                	
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
              <div><p>Wybierz, jaką rolę pełnisz:</p></div>
              <FormControl fullWidth>
                <InputLabel id="role-label">Rola</InputLabel>
                <Select
                  labelId="role-label"
                  value={role}
                  sx={{ marginBottom: "16px" }}
                  onChange={(e) => setRole(e.target.value)}
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
    </div>
  );
}
