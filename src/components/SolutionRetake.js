import React, { useEffect, useState } from "react";
import { TextField, Paper, Button, Box, CircularProgress } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import { classInfo } from "./semi-components/MyParticles";
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
    left: "5%",
    display: "block",
    flexDirection: "row",
    fontWeight: "lighter",
  },
});

function Toast({ message }) {
  return <div className="toast">{message}</div>;
}
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
    setisLoading(true);
    const id = solution.id;
    const updatesolution = {
      id,
      solutionContent,
      exercise,
      student,
      score,
      output
    };

    fetch("http://localhost:8080/solution/", {
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
    setisLoading(false);
  };
  const runCode = () => {
    setisLoading(true);
    setisOutput(true);
    classInfo.setmessage(false);
    fetch("http://localhost:8080/exercise/out", {
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
      setisLoading(false);
  };

 

  const getData = async () => {
    const result = await fetch("http://localhost:8080/solution/" + task, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    }).catch((error) => console.error("Error fetching:", error));
    const result_data = await result.json();
    setSolution(result_data[0]);
    setStudent(result_data[0].student);
    setSolutionContent(result_data[0].solutionContent);
    const exerciseEX = result_data[0].exercise;
    await fetch(
      "http://localhost:8080/exercise/one/programming/" + exerciseEX.id,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExercise(result[0]);
      })
      .catch((error) => console.error("Error fetching :", error));
  };

  useEffect(() => {
    getData();
  }, [task]);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        <div>
          {solution && (
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
              {exercise && (
                <div style={{ flexBasis: "40%", flexDirection: "column" }}>
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
                      {exercise.correctOutput
                        .split("\n")
                        .map((element, index) => (
                          <p key={index}>{element}</p>
                        ))}
                    </Paper>
                  </Paper>
                </div>
              )}
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
                    </Box>
                    </div>
                  )}
                </div>
                <Box>{isLoading && <CircularProgress />}</Box>
                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>

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
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
