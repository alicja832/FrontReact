import React, { useEffect, useState } from "react";
import { Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";
import { useLocation } from "react-router-dom";

const useStyles = makeStyles({});

export default function SolutionAbc() {
  const location = useLocation();

  const buttonStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    width: "40%",
    margin: "1%",
  };

  const paperStyle = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
    display: "flex",
    marginTop: "3%",
    flexDirection: "column",
  };

  const classes = useStyles();
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [checkedC, setCheckedC] = useState(false);
  const [checkedD, setCheckedD] = useState(false);
  const [exercise, setExercise] = useState(null);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setInfoMessage] = useState(0);
  const [user, setUser] = useState(null);
  const timeout = 3000;

  const handlechangeA = () => {
    setCheckedA(true);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(false);
    setAnswer("A");
  };
  const handlechangeB = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(true);
    setAnswer("B");
  };
  const handlechangeC = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(true);
    setCheckedB(false);
    setAnswer("C");
  };
  const handlechangeD = () => {
    setCheckedA(false);
    setCheckedD(true);
    setCheckedC(false);
    setCheckedB(false);
    setAnswer("D");
  };
  /**
   * save solution
   */
  const save = () => {
    setIsLoading(true);
    var student = null;
    const solution = { exercise, student, score, answer };

    fetch(`${process.env.REACT_APP_API_URL}/solution/abc`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solution),
    })
      .then((res) => {
        if (!res.ok) {
          setInfoMessage("Błąd zapisu");
        } else setInfoMessage("Zapisano");
        setInfoWindowShown(true);
      })
      .catch((error) => {
        console.error("Error:", error);
        setInfoMessage("Błąd zapisu");
        setInfoWindowShown(true);
      });
    setIsLoading(false);
  };
  /**
   * check solution
   */
  const check = () => {
    setIsLoading(true);
    setInfoWindowShown(true);

    if (answer === exercise.correctAnswer) {
      setScore(exercise.maxPoints);
      setInfoMessage("Prawidłowa odpowiedź");
    } else {
      setInfoMessage("Niepoprawna odpowiedź");
    }

    setTimeout(() => {
      setInfoWindowShown(false);
    }, timeout);

    setIsLoading(false);
  };

  useEffect(() => {
    setExercise(location.state.exercise.shortExercise.key);
  }, [location.state.exercise.shortExercise.key]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setUser(result[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div className="main-container">
      <div className="first-container">
        <div>
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
        </div>
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
              <Paper elevation={3} style={paperStyle}>
                <h2>{exercise.name}</h2>
                <Textarea defaultValue={exercise.introduction}></Textarea>

                <h4>Maksymalna ilość punktów: {exercise.maxPoints}</h4>
              </Paper>
            </div>

            <div style={{ flexBasis: "50%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyle}>
                <h4>{exercise.content}</h4>
                <h4>Wybierz jedną odpowiedź: </h4>
                <FormControl fullWidth>
                  <FormGroup>
                    <div className="main-row">
                      <div className="right-info">
                        <FormControlLabel
                          label={"A."}
                          value={exercise.firstOption}
                          control={
                            <Checkbox
                              onChange={handlechangeA}
                              checked={checkedA}
                            />
                          }
                        />
                      </div>
                      <div className="option">
                        <Textarea
                          defaultValue={exercise.firstOption}
                        ></Textarea>
                      </div>
                    </div>
                    <div className="main-row">
                      <div className="right-info">
                        <FormControlLabel
                          label={"B."}
                          value={exercise.secondOption}
                          control={
                            <Checkbox
                              onChange={handlechangeB}
                              checked={checkedB}
                            />
                          }
                        />
                      </div>
                      <div className="option">
                        <Textarea
                          defaultValue={exercise.secondOption}
                        ></Textarea>
                      </div>
                    </div>
                    <div className="main-row">
                      <div className="right-info">
                        <FormControlLabel
                          label={"C."}
                          value={exercise.thirdOption}
                          control={
                            <Checkbox
                              onChange={handlechangeC}
                              checked={checkedC}
                            />
                          }
                        />
                      </div>
                      <div className="option">
                        <Textarea
                          defaultValue={exercise.thirdOption}
                        ></Textarea>
                      </div>
                    </div>
                    {exercise.fourthOption && (
                      <div className="main-row">
                        <div className="right-info">
                          <FormControlLabel
                            label={"D."}
                            value={exercise.fourthOption}
                            control={
                              <Checkbox
                                onChange={handlechangeD}
                                checked={checkedD}
                              />
                            }
                          />
                        </div>
                        <div className="option">
                          <Textarea
                            defaultValue={exercise.fourthOption}
                          ></Textarea>
                        </div>
                      </div>
                    )}
                  </FormGroup>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  ></Box>
                </FormControl>
                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>
                {!isLoading && (
                  <Box display="inline" flexDirection="column" gap={2}>
                    {user && user.score >= 0 && !infoWindowShown && (
                      <Button
                        style={{ backgroundColor: "#001f3f" }}
                        variant="contained"
                        color="secondary"
                        onClick={save}
                      >
                        Zapisz rozwiązanie
                      </Button>
                    )}
                    {((user && !user.score) || !user) && (
                      <Button
                        style={buttonStyle}
                        variant="contained"
                        color="secondary"
                        onClick={check}
                      >
                        Sprawdź
                      </Button>
                    )}
                  </Box>
                )}
                {isLoading && <CircularProgress />}
              </Paper>
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
