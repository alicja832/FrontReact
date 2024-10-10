import React, { useEffect, useState } from "react";
import {
  TextField,
  IconButton,
  Paper,
  Typography,
  Button,
  Box,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { makeStyles } from "@mui/styles";
import { getLogin,getRole } from "./api/TokenService";
import MyParticles from "./MyParticles";
import Font from "react-font";

const useStyles = makeStyles({
  position: "relative",
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px", 
  },
  textFieldContainer: {
    position: "relative",
    width: "100%",
    border: "1%",
    borderStyle: "solid",
    borderColor: "white",
    height: "900px",
    backgroundColor: "grey",
    display: "flex",
    fontWeight: "bold",
    alignItems: "center",
    gap: "1%", 
  },

  textFxx: {
    position: "relative",
    width: "600px",
    border: "1px",
    borderStyle: "solid",
    borderColor: "blue",
    height: "100px",
    backgroundColor: "white",
    color: "black",
    display: "flex",
    alignItems: "center",
    gap: "10px", 
  },
  textField: {
    position: "relative",
    height: "70%",
    backgroundColor: "#000", 
    color: "#fff", 
    "& .MuiInputBase-input": {
      color: "#fff", 
    },
    "& .MuiFormLabel-root": {
      color: "#fff", 
    },
  },
  button: {
    position: "relative",
    color: "#fff",
    backgroundColor: "#000", 
    "&:hover": {
      backgroundColor: "#333", 
    },
  },
  output: {
    position: "relative",
    backgroundColor: "#000", 
    color: "#fff", 
    padding: "10px",
    height: "30%", 
    width: "100%", 
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

export default function Solution({ task }) {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    textAlign: "center",
  };
  const paperStyleTwo = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    textAlign: "center",
  };

  const classes = useStyles();
  const [solutionContent, setSolutionContent] = useState("");
  const [output, setOutput] = useState("");
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setinfoMessage] = useState(0);

  const handleInputChange = (e) => {
    setSolutionContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setSolutionContent(
        (prevContent) =>
          prevContent.substring(0, selectionStart) +
          "\t" +
          prevContent.substring(selectionEnd)
      );
      setTimeout(() => {
        e.target.selectionStart = selectionStart + 1;
        e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const save = () => {
    var studentEmail = getLogin();
    const solution = { solutionContent, exercise, studentEmail, score, output };
    fetch("http://localhost:8080/exercise/solution", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        alert("Zapisano");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleButtonClick = () => {
    fetch("http://localhost:8080/exercise/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: solutionContent,
    })
      .then((res) => res.text())
      .then((result) => {
        setOutput(result);
      })
      .catch((error) => { 
        setOutput("Error occurred");
      });
  };
  const check = () => {
    var student = null;
    const solution = { solutionContent, exercise, student, score, output };

    fetch("http://localhost:8080/exercise/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        setScore(result);
        setinfoMessage("Twój wynik to:" + result.toString());
        setInfoWindowShown(true);
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3000);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });

  };

  useEffect(() => {   
    fetch("http://localhost:8080/exercise/one/" + task, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setExercise(result[0]);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div>
      <MyParticles></MyParticles>
      <div>
        {
          <div
            className={classes.mainContainer}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "10%",
            }}
          >
            <div style={{ flexBasis: "60%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyleTwo}>
                <h2>{exercise.name}</h2>
                <Font family="tahoma">
                <p>{exercise.introduction}</p>
                </Font>
              </Paper>
              <Paper elevation={3} style={paperStyle}>
                <p>{exercise.content}</p>
                <p>Maksymalna ilość punktów: {exercise.maxPoints} </p>
                <p>Oczekiwane wyjście programu: {exercise.correctOutput}</p>
              </Paper>
            </div>
            <div
              className={classes.textFieldContainer}
              style={{ flexDirection: "column", flexBasis: "40%" }}
            >
              <TextField
                className={classes.textField}
                variant="outlined"
                placeholder="Miejsce na rozwiązanie..."
                value={solutionContent}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                fullWidth
                multiline
                maxRows={15}
              />
              <IconButton
                className={classes.button}
                onClick={handleButtonClick}
                aria-label="submit"
              >
                <div>
                  <ArrowForwardIcon />
                </div>
              </IconButton>
              <Paper className={classes.output} fullWidth>
                <Typography>{output}</Typography>
              </Paper>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  style={{ backgroundColor: "#001f3f" }}
                  variant="contained"
                  color="secondary"
                  onClick={check}
                >
                  Sprawdz
                </Button>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                {infoWindowShown && <Toast message={infoMessage} />}
              </Box>
               <Box display="flex" flexDirection="column" gap={2}>
              {(getRole() === "Student")&&
                  <Button
                    style={{ backgroundColor: "#001f3f" }}
                    variant="contained"
                    color="secondary"
                    onClick={save}
                  >
                    Zapisz rozwiązanie
                  </Button>
                  }
                </Box>
              
            </div>
          </div>
        }
      </div>
    </div>
  );
}
