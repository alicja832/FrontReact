import TextField from "@mui/material/TextField";
import { makeStyles } from "@mui/styles";
import { Container, Paper, Button, Box ,CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { FilledInput, IconButton, InputAdornment } from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import Footer from "./semi-components/Footer";

const useStyles = makeStyles((theme) => ({}));

export default function PasswordReminder() {

    const [code, setCode] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [psw, setPsw] = useState(false);
    const [errorMessage, seterrorMessage] = useState(false);
    const [errorWindowShown, seterrorInfoWindowShown] = useState(false);
    const [isFormVisible,setIsFormVisible] = useState(false);
    const [isFormCodeVisible,setIsFormCodeVisible] = useState(false);
    const [infoWindowShown, setInfoWindowShown] = useState(false);
    const [emailFormShow, setemailFormShow] = useState(true);
    const [infoTwoWindowShown, setInfoTwoWindowShown] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleShowPsw = () => setPsw((show) => !show);
    const handleHidePsw = (e) => {
      e.preventDefault();
    };
    const classes = useStyles();
  
    function showCodeForm()
    {
      setIsFormCodeVisible(true);
      
    }
    function closeCodeForm()
    {
      setIsFormCodeVisible(false);
    }
    function showForm()
    {
      setIsFormVisible(true);
    
    }
   
    const paperStyle = {
      top: "4em",
      padding: "4% 4%",
      width: '70%',
      margin: "1% auto",
      backgroundColor: "#FDF5E6",
      position: "relative",
    };
  /**
   * function which sent the email from form to server 
   */
  function send()
  {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/user/code`;
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:email
      })
      .then((response) => {
        
        if (!(response.status===200)) {
          
          const promise1 = Promise.resolve(response.body.getReader().read());
          promise1.then((value) => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(value.value);
            seterrorMessage(text);
          })
          setInfoWindowShown(false);
          seterrorInfoWindowShown(true);
          setTimeout(() => {
            seterrorInfoWindowShown(false);
          }, 3000);
        
        }
        else
        {
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          showCodeForm();
        }
      }).catch((error) =>
        {
          seterrorMessage("Błąd połączenia");
          setInfoWindowShown(false);
          seterrorInfoWindowShown(true);
          setTimeout(() => {
            seterrorInfoWindowShown(false);
          }, 3000);
        });
        setIsLoading(false);
  };
  /**
   * verification of code from form
   */
  function verificationCode()
  {
    setIsLoading(true);
    const verification = {email,code,password};
    const url = `${process.env.REACT_APP_API_URL}/user/codeverification`;
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body:JSON.stringify(verification)
      })
      .then((response) => {
        if (!response.ok) {
          const promise1 = Promise.resolve(response.body.getReader().read());
          promise1.then((value) => {
            const decoder = new TextDecoder('utf-8');
            const text = decoder.decode(value.value);
            seterrorMessage(text);
          })
          setInfoWindowShown(false);
          seterrorInfoWindowShown(true);
          setTimeout(() => {
            seterrorInfoWindowShown(false);
          }, 3000);
        }
        else
        {
          setCode("");
          closeCodeForm();
          showForm();
        }
      }).catch((error) =>
        {
          console.log(error);
        });
        setIsLoading(false);
  }
  /**
   * function which sent the new version of password to serwer 
   */
  function changePassword()
  {
    setIsLoading(true);
    const verification = {email,code,password};
    fetch(`${process.env.REACT_APP_API_URL}/user/changepassword`,
    {
      method: "PUT",
      headers : { "Content-Type": "application/json" },
      body: JSON.stringify(verification)
    }).then((response)=>{
      if (!response.ok) {
        const promise1 = Promise.resolve(response.body.getReader().read());
        promise1.then((value) => {
          const decoder = new TextDecoder('utf-8');
          const text = decoder.decode(value.value);
          seterrorMessage(text);
        })
        setInfoWindowShown(false);
        seterrorInfoWindowShown(true);
        setTimeout(() => {
          seterrorInfoWindowShown(false);
        }, 3000);
      }
      else
      {
        setPassword("");
        setInfoTwoWindowShown(true);
        setTimeout(() => {
          setInfoTwoWindowShown(false);
          setIsFormVisible(false);
        }, 3000);
      }
     
    }).catch((error) =>
    {
      console.log(error);
    })
    setIsLoading(false);
  }
  
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div className="main-container">
      <div className="first-container">
    {(emailFormShow)&&
    <Container>
          <Paper elevation={3} style={paperStyle}>
          <h4>Wprowadź adres email, na który ma zostać wysłany kod pozwalający na zmianę hasła.</h4>

            <form className={classes.root} noValidate autoComplete="off">
            
              <TextField
                id="outlined-basic"
                label="email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: "16px" }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "16px",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  { !isLoading &&  
                   <Button
                    variant="contained"
                    style={{ backgroundColor: "#001f3f" }}
                    onClick={send}
                   >
                    Wyślij
                  </Button>
                  }
                  { isLoading && 
                    <CircularProgress size={24}/>
                  }
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  {isLoading && <CircularProgress size={24}/>}
                  {infoWindowShown && <Toast message="Na podany adres email wysłano wiadomość z kodem do zmiany hasła" />}
                  {errorWindowShown && <Toast message={errorMessage} />}
                </Box>
              </div>
            </form>
          </Paper>
        </Container>
    }
        {(isFormCodeVisible)&&
          <Container>
          <Paper elevation={3} style={paperStyle}>
          <h5>Wprowadź kod, który wysłano na podany adres email</h5>

            <form className={classes.root} noValidate autoComplete="off">
            
              <TextField
                id="outlined-basic"
                label="kod"
                variant="outlined"
                fullWidth
                value={code}
                onChange={(e) => setCode(e.target.value)}
                sx={{ marginBottom: "16px" }}
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
                    color="primary"
                    onClick={verificationCode}
                  >
                    Zweryfikuj
                  </Button>
                  { isLoading && 
                    <CircularProgress size={24}/>
                  }
                </Box>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                
              </div>
            </form>
          </Paper>
        </Container>
      }
        {(isFormVisible)&&
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <form className={classes.root} noValidate autoComplete="off">
              <FilledInput
                value={password}
                placeholder="hasło"
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
                { !isLoading && <Button
                    variant="contained"
                    color="primary"
                    onClick={changePassword}
                  >
                   Zmień
                   </Button>
                }
                  { isLoading && 
                    <CircularProgress size={24}/>
                  }
                    
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
                  {infoTwoWindowShown && <Toast message="Hasło zostało zmienione" />}
                </Box>
              </div>
            </form>
          </Paper>
        </Container>}
    </div>
    <div className="footer">
      <Footer />
      </div>
    </div>
  );
}
