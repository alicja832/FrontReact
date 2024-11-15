import React, { useEffect, useState } from "react";
import {
  TextField,
  Paper,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import Font from "react-font";
import { classInfo } from "./semi-components/MyParticles";

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
    width: "90%",
    padding: " 2% 5%",
    border: "1%",
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "grey",
    display: "flex",
    fontWeight: "bold",
    alignItems: "center",
    gap: "1%",
  },
  textField: {
    position: "relative",
    height: "500px",
    width: "100%",
    marginLeft: "5%",
    backgroundColor: "#000",
    color: "#fff",
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    margin: "2%",
    gap: "20px",
    position: "relative",
  },
  button: {
    position: "relative",
    color: "#fff",
    backgroundColor: "#000",
  },
  output: {
    position: "relative",
    backgroundColor: "#000 !important",
    color: "#fff !important",
    padding: "1%",
    width: "100%",
    marginTop: "1%",
    display: "block",
    justifyContent: "center",
    flexDirection: "row",
    fontWeight: "lighter",
  },
});

function Toast({ message }) {
  return <div className="toast">{message}</div>;
}
export default function SolutionRetake({ task }) {
  //dlaczego na sztywno to jest ustawione
  const paperStyle = { padding: "50px 20px", width: 600, margin: "20px auto" };

  const paperStyleTwo = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    textAlign: "center",
  };

  const classes = useStyles();
  const [isOutput, setisOutput] = useState(false);
  const [solution, setSolution] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [solutionContent, setSolutionContent] = useState("");
  const [output, setOutput] = useState("");
  const [score, setScore] = useState(0);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setinfoMessage] = useState(0);
  const [student, setStudent] = useState(null);
  const [outputs, setOutputs] = useState([]);

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
    const id = solution.id;
    const updatesolution = {
      id,
      solutionContent,
      exercise,
      student,
      score,
      output,
    };

    fetch("http://localhost:8080/exercise/solution", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatesolution),
    })
      .then((res) => res.text())
      .then((result) => {
        setinfoMessage("Zapisano!");
        setInfoWindowShown(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setinfoMessage("Błąd zapisu!");
      });
  };
  const runCode = () => {
    setisOutput(true);
    classInfo.setmessage(false);
    fetch("http://localhost:8080/exercise/interpreter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: solutionContent,
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setOutput(result);
        setOutputs(result.split("\n"));
      })
      .catch((error) => {
        console.log(error);
        setOutput("Error occurred");
      });
  };

  const check = () => {
    var student = null;
    setisOutput(true);
    const solution = { solutionContent, exercise, student, score, output };
    console.log(outputs);
    fetch("http://localhost:8080/exercise/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        setScore(result);
        setinfoMessage("Twój wynik to " + result.toString() + " pkt");
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
    fetch("http://localhost:8080/exercise/solution/" + task, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setSolution(result[0]);
        setExercise(result[0].exercise);
        setStudent(result[0].student);
        setSolutionContent(result[0].solutionContent);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);
  if (!solution) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        {
          <div
            className={classes.mainContainer}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "3%",
            }}
          >
            {!exercise && (
              <div>
                <CircularProgress />
              </div>
            )}
            <div style={{ flexBasis: "40%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyleTwo}>
                <h2>{exercise.name}</h2>
                <Font family="tahoma">
                  <p>{exercise.introduction}</p>
                </Font>
              </Paper>
              <Paper elevation={3} style={paperStyle}>
                <Font family="sans-serif">
                  <p>{exercise.content}</p>
                </Font>
                <h4>Maksymalna ilość punktów: </h4>
                <p> {exercise.maxPoints} </p>
                <h4>Oczekiwane wyjście programu:</h4>
                <p> {exercise.correctOutput}</p>
              </Paper>
            </div>
            <div
              className={classes.textFieldContainer}
              style={{
                flexDirection: "column",
                flexBasis: "60%",
                marginTop: "2%",
              }}
            >
              <h3>Konsola dla Python 2.7</h3>
              <div
                className={classes.textFieldContainer}
                style={{
                  flexDirection: "column",
                  flexBasis: "55%",
                  marginTop: "2%",
                  backgroundColor: "black",
                }}
              >
                <TextField
                  className={classes.textField}
                  InputProps={{
                    disableUnderline: true,
                  }}
                  
                  variant="standard"
                  defaultValue={solution.solutionContent}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  multiline
                  maxRows={15}
                />
              </div>
              <div className={classes.headerContainer}>
                <Button
                  style={{ backgroundColor: "#adff2f" }}
                  variant="contained"
                  color="secondary"
                  onClick={runCode}
                >
                  Wykonaj kod
                </Button>

                <Button
                  style={{ backgroundColor: "#001f3f" }}
                  variant="contained"
                  color="secondary"
                  onClick={check}
                >
                  Sprawdź
                </Button>

                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>

                <Box display="inline" flexDirection="column" gap={2}>
                  <Button
                    style={{ backgroundColor: "#001f3f" }}
                    variant="contained"
                    color="secondary"
                    onClick={save}
                  >
                    Zapisz rozwiązanie
                  </Button>
                </Box>
              </div>
              {isOutput && (
                <Paper multiline="true" className={classes.output}>
                  {outputs.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </Paper>
              )}
            </div>
          </div>
        }
      </div>
    </div>
  );
}
