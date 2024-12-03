import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";

const useStyles = makeStyles({});

export default function Solution({ task }) {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
  };
  const paperStyleTwo = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    margin: "2%",
    marginTop: "3%",
    padding: "1%",
    textAlign: "center",
    alignItems: "center",
  };

  const classes = useStyles();
  const [solutionContent, setSolutionContent] = useState("");
  const [output, setOutput] = useState("");
  const [isOutput, setisOutput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [outputs, setOutputs] = useState([]);
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setinfoMessage] = useState(0);
  const [user, setUser] = useState(null);
  const timeout = 4000;
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
    setIsLoading(true);
    var student = null;
    const solution = { solutionContent, exercise, student, score, output };
    fetch("http://localhost:8080/solution/programming", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solution),
    })
      .then((res) => {
        if (res.ok) {
          setinfoMessage("Zapisano");
          setInfoWindowShown(true);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const runCode = () => {
    console.log(solutionContent);
    fetch("http://localhost:8080/exercise/out", {
      method: "POST",
      body: solutionContent,
    })
      .then((res) => res.text())
      .then((result) => {
        setisOutput(true);
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
    const solution = { exercise, solutionContent, student, score, output };
    console.log(outputs);
    fetch("http://localhost:8080/solution/programming/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setScore(result);
        setinfoMessage("Twój wynik:" + result.toString() + " pkt");
        setInfoWindowShown(true);
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 2 * timeout);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/exercise/one/programming/" + task, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setExercise(result[0]);
      })
      .catch((error) => console.error("Error fetching students:", error));
    if (getToken()) {
      fetch("http://localhost:8080/user/", {
        headers: { Authorization: `Bearer ${getToken()}` },
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          setUser(result[0]);
        });
    }
  }, [task]);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div className="main-container">
      <div className="first-container">
        {exercise && (
          <div
            className={classes.mainContainer}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "1%",
              marginTop: "2%",
            }}
          >
            <div style={{ flexBasis: "50%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyleTwo}>
                <h2>{exercise.name}</h2>

                <Textarea defaultValue={exercise.introduction}></Textarea>
              </Paper>
              <Paper elevation={3} style={paperStyle}>
                <p>{exercise.content}</p>
                <h4>Maksymalna ilość punktów: </h4>
                <p> {exercise.maxPoints} </p>
                <h4>Oczekiwane wyjście programu:</h4>
                <Paper multiline="true" className="expected-output">
                  {exercise.correctOutput.split("\n").map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </Paper>
              </Paper>
            </div>
            <div
                className="console-container"
              >
              <h3>Konsola dla Python 2.7</h3>
              <div
                 className="console-board"
               
              >
                <TextField
                  className="console"
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                  }}
                  placeholder="Miejsce na rozwiązanie..."
                  value={solutionContent}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  fullWidth
                  multiline
                  maxRows={15}
                />
              </div>
              <div className="header-container">
                {!infoWindowShown && !isLoading && (
                  <div>
                    <Button
                      style={{
                        backgroundColor: "#adff2f",
                        color: "black",
                        margin: "5px",
                      }}
                      variant="contained"
                      color="secondary"
                      onClick={runCode}
                    >
                      Wykonaj kod
                    </Button>
                    {!isLoading && (
                      <Box display="inline" flexDirection="column" gap={2}>
                        {user && user.score >= 0 && (
                          <Button
                            style={{
                              backgroundColor: "#001f3f",
                              margin: "5px",
                            }}
                            variant="contained"
                            color="secondary"
                            onClick={save}
                          >
                            Zapisz rozwiązanie
                          </Button>
                        )}
                        {(!user || !user.score) && (
                          <Button
                            style={{ backgroundColor: "#001f3f" }}
                            variant="contained"
                            color="secondary"
                            onClick={check}
                          >
                            Sprawdź
                          </Button>
                        )}
                      </Box>
                    )}
                  </div>
                )}
                   <Box>{isLoading && <CircularProgress/>}</Box>
                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>
              </div>
              {isOutput && outputs.length > 0 && (
                <Paper multiline="true" className="output">
                  {outputs.map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </Paper>
              )}
              {isOutput && !outputs.length && <CircularProgress />}
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
