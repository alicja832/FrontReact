import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";

const useStyles = makeStyles({
  position: "relative",
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    gap: "1%",
  },
  textFieldContainer: {
    position: "relative",
    width: "90%",
    padding: " 1% 1%",
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
    width: "90%",
    marginTop: "1%",
    display: "block",
    padding: "1%",
    justifyContent: "center",
    flexDirection: "row",
    fontWeight: "lighter",
  },
  ExpectedOutput: {
    position: "relative",
    backgroundColor: "#000 !important",
    color: "#fff !important",
    width: "90%",
    marginLeft: "5%",
    display: "block",
    justifyContent: "center",
    flexDirection: "row",
    fontWeight: "lighter",
  },
});

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
    console.log(score);
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
        console.log(result);
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
          console.log(result);
          setUser(result[0]);
        });
    }
  }, [task]);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        {exercise && (
          <div
            className={classes.mainContainer}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              padding: "3% 1%",
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
                <Paper multiline="true" className={classes.ExpectedOutput}>
                  {exercise.correctOutput.split("\n").map((element, index) => (
                    <p key={index}>{element}</p>
                  ))}
                </Paper>
              </Paper>
            </div>
            <div
              className={classes.textFieldContainer}
              style={{
                flexDirection: "column",
                flexBasis: "50%",
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
              <div className={classes.headerContainer}>
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
                <Paper multiline="true" className={classes.output}>
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
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
