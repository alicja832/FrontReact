import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";

const useStyles = makeStyles({});

export default function SolutionAbcRetake({ task }) {
  const paperStyleTwo = {
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
  const [answer, setAnswer] = useState("");
  const [exercise, setExercise] = useState(null);

  const handlechangeA = () => {
    setCheckedA(true);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(false);
  };
  const handlechangeB = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(true);
  };
  const handlechangeC = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(true);
    setCheckedB(false);
  };
  const handlechangeD = () => {
    setCheckedA(false);
    setCheckedD(true);
    setCheckedC(false);
    setCheckedB(false);
  };

  const setAnswerChecked = (answer) => {
    if (answer === "A") {
      handlechangeA();
    }
    if (answer === "B") {
      handlechangeB();
    }
    if (answer === "C") {
      handlechangeC();
    }
    if (answer === "D") {
      handlechangeD();
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/solution/abc/` + task, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setExercise(result[0].exercise);
        setAnswer(result[0].exercise.correctAnswer);
        setAnswerChecked(result[0].answer);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

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

                <h4>Maksymalna ilość punktów: {exercise.maxPoints}</h4>
              </Paper>
            </div>

            <div style={{ flexBasis: "50%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyleTwo}>
                <h4>{exercise.content}</h4>
                <FormControl fullWidth>
                  <FormGroup>
                    <div className="main-row">
                      <div className="right-info">
                        <FormControlLabel
                          label={"A. "}
                          value={exercise.firstOption}
                          control={
                            <Checkbox checked={checkedA} disabled={!checkedA} />
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
                          label={"B. "}
                          value={exercise.secondOption}
                          control={
                            <Checkbox checked={checkedB} disabled={!checkedB} />
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
                          label={"C. "}
                          value={exercise.thirdOption}
                          control={
                            <Checkbox checked={checkedC} disabled={!checkedC} />
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
                            label={"B. "}
                            value={exercise.fourthOption}
                            control={
                              <Checkbox
                                checked={checkedD}
                                disabled={!checkedD}
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
                </FormControl>
                <h4>Prawidłowa odpowiedź: {answer}</h4>
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
