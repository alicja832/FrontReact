import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import { classInfo } from "./semi-components/MyParticles";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";

const useStyles = makeStyles({});

export default function SolutionRetake({ task }) {
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
    marginTop: "4%",
    padding: "1%",
    textAlign: "center",
    alignItems: "center",
  };

  const classes = useStyles();
  const [isLoading, setisLoading] = useState(false);
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
  const timeout = 3000;

  const handleInputChange = (e) => {
    setSolutionContent(e.target.value);
  };
  /**
   * 
   * @param {} e -key down event
   */
  const handleKeyTabDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setSolutionContent(
        (prev) =>
          prev.substring(0, selectionStart) +
          "\t" +
          prev.substring(selectionEnd)
      );
      setTimeout(() => {
        e.target.selectionStart = selectionStart + 1;
        e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };
  /**
   * update solution
   */
  const save = () => {
    setisLoading(true);
    const id = solution.id;
    const updatesolution = {
      id,
      solutionContent,
      exercise,
      student,
      score,
      output,
    };

    fetch(`${process.env.REACT_APP_API_URL}/solution/`, {
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
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3 * timeout);
      })
      .catch((error) => {
        console.error("Error:", error);
        setinfoMessage("Błąd zapisu!");
      });
    setisLoading(false);
  };
  const runCode = () => {
    setisLoading(true);
    setisOutput(true);
    classInfo.setmessage(false);
    fetch(`${process.env.REACT_APP_API_URL}/exercise/out`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: solutionContent,
    })
      .then((res) => res.text())
      .then((result) => {
        setOutput(result);
        setOutputs(result.split("\n"));
      })
      .catch((error) => {
        console.log(error);
        setOutput("Error occurred");
      });
    setisLoading(false);
  };
  const check = () => {
    var student = null;
    setisOutput(true);
    const solution = { exercise, solutionContent, student, score, output };
    const url = exercise.solutionSchema
      ? `${process.env.REACT_APP_API_URL}/solution/programming/test`
      : `${process.env.REACT_APP_API_URL}/solution/programming/check`;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.json())
      .then((result) => {
        if (exercise.solutionSchema) {
          setScore(result.value);
          setisOutput(true);
          setOutput(result.key);
          setOutputs(result.key.split("\n"));
          setinfoMessage("Twój wynik:" + result.value.toString() + " pkt");
        } else {
          setScore(result);
          setinfoMessage("Twój wynik:" + result.toString() + " pkt");
        }

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
  const getData = async () => {
    const result = await fetch(
      `${process.env.REACT_APP_API_URL}/solution/` + task,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      }
    ).catch((error) => console.error("Error fetching:", error));
    const result_data = await result.json();
    setSolution(result_data[0]);
    setStudent(result_data[0].student);
    setSolutionContent(result_data[0].solutionContent);
    const exerciseFromSolution = result_data[0].exercise;

    await fetch(
      `${process.env.REACT_APP_API_URL}/exercise/one/programming/` +
        exerciseFromSolution.id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setExercise(result[0]);
      })
      .catch((error) => console.error("Error fetching :", error));
  };

  useEffect(() => {
    getData();
  }, [task]);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div className="main-container">
      <div className="first-container">
        {!exercise && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <CircularProgress />
          </div>
        )}
        <div>
          {solution && exercise && (
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
                    {exercise.correctOutput
                      .split("\n")
                      .map((element, index) => (
                        <p key={index}>{element}</p>
                      ))}
                  </Paper>
                </Paper>
              </div>

              <div className="console-container">
                <h3>Konsola dla Python 2.7</h3>
                <div className="console-board">
                  <TextField
                    className="console"
                    InputProps={{
                      disableUnderline: true,
                    }}
                    variant="standard"
                    value={solutionContent}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyTabDown}
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

                      <Box display="inline" flexDirection="column" gap={2}>
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

                        <Button
                          style={{ backgroundColor: "#001f3f" }}
                          variant="contained"
                          color="secondary"
                          onClick={check}
                        >
                          Sprawdź
                        </Button>
                      </Box>
                    </div>
                  )}
                </div>
                <Box>{isLoading && <CircularProgress />}</Box>
                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>

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
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
