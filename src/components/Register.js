import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Container,
  Paper,
  Button,
  Box,
  FilledInput,
  IconButton,
  InputAdornment,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { VisibilityOffOutlined, VisibilityOutlined } from "@mui/icons-material";
import Footer from "./semi-components/Footer";
import { setToken, setExpirationDate } from "./api/TokenService";

export default function Register() {
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
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [pswVisible, setPswVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const timeout = 3000;

  const handleShowPsw = () => setPswVisible((prev) => !prev);

  const validateData = () => {
    if (!email.includes("@")) {
      throw new Error("Podano zły adres email");
    }
    if (password.length<8) {
      throw new Error("Hasło powinno mieć 8 znaków minimum");
    }
    if (password !== passwordConfirm) {
      throw new Error("Podane hasła różnią się");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      validateData();
      const role = roles === 1 ? "TEACHER" : "STUDENT";
      const student = { name, email, password, role };

      const registerResponse = await fetch("http://localhost:8080/user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      if (!registerResponse.ok) {
        const errorText = await registerResponse.text();
        throw new Error(errorText || "Rejestracja nie powiodła się");
      }

      const authResponse = await fetch(
        "http://localhost:8080/user/authenticate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, password }),
        }
      );

      if (!authResponse.ok) {
        throw new Error("Błąd logowania po rejestracji. Spróbuj ponownie.");
      }

      const authData = await authResponse.json();
      setToken(authData.token);
      setExpirationDate(authData.jwtExpirationDate);
      console.log(authData.jwtExpirationDate);
      const url = "http://localhost:8080/user/refreshtoken";
      // const url = "https://naukapythona.azurewebsites.net/user/authenticate";
      const refreshToken = await fetch(url, {
        method: "GET",
        headers: { Authorization: `Bearer ${authData.token}` },
      });
      if (!refreshToken.ok) {
        throw new Error("Błąd logowania po rejestracji. Spróbuj ponownie.");
      }
      console.log(refreshToken);
      setSuccessMessage("Zarejestrowano!");
      window.location.reload();
      setTimeout(() => {
        navigate("/profil");
      }, timeout);
    } catch (error) {
      setErrorMessage(error.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 2*timeout);
    } finally {
      setIsLoading(false);
    }
  };
  function Toast({ message }) {
  
    return <div className="toast">{message}</div>;
  }
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        <Container>
          <Paper elevation={3} style={paperStyle}>
            <div style={{ fontSize: "large", marginBottom: "8%" }}>
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ height: "3%", verticalAlign: "middle" }}
              />
              Nauka Pythona
            </div>
            <form onSubmit={handleRegister}>
              <TextField
                label="Nazwa użytkownika"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ marginBottom: "16px" }}
              />
              <TextField
                label="Adres e-mail"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: "16px" }}
                error={!!errorMessage && !email.includes("@")}
                helperText={
                  !!errorMessage && !email.includes("@")
                    ? "Podano zły adres email"
                    : ""
                }
              />
              <FilledInput
                value={password}
                placeholder="Hasło"
                onChange={(e) => setPassword(e.target.value)}
                type={pswVisible ? "text" : "password"}
                fullWidth
                sx={{ marginBottom: "16px" }}
                error={!!errorMessage && password.length<8}
                helperText={
                  !!errorMessage && !password.length<8
                    ? "Hasło powinno mieć długość minimum 8 znaków"
                    : ""
                }
                endAdornment={
                  <InputAdornment position="start">
                    <IconButton onClick={handleShowPsw}>
                      {pswVisible ? (
                        <VisibilityOffOutlined />
                      ) : (
                        <VisibilityOutlined />
                      )}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FilledInput
                value={passwordConfirm}
                placeholder="Potwierdzenie hasła"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                type={pswVisible ? "text" : "password"}
                fullWidth
                sx={{ marginBottom: "16px" }}
              />
              <FormControl fullWidth sx={{ marginBottom: "16px" }}>
                <InputLabel>Rola</InputLabel>
                <Select
                  value={roles}
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
                 {(!successMessage)&&
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#001f3f" }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} /> : "Zarejestruj"}
                  </Button>
                  } 
                  <Box>
                  {successMessage && (
                   <Toast message={successMessage}/>
                  )}
                  {errorMessage && (
                    <Toast sx={{backgroundColor:"red"}} message={errorMessage}/>
                  )}
                  </Box>
                </Box>
              </div>
            </form>
          </Paper>
        </Container>
      </div>
      <div style={{ flex: 1 }}>
        <Footer />
      </div>
    </div>
  );
}
