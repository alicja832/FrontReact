import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Paper, Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";

const useStyles = makeStyles({
  points: {
    width: "30px",
    height: "30px",
    display: "flex",
    alignItems: "center",
    border: "3px",
    borderStyle: "solid",
    borderColor: "blue",
    borderRadius: "5px",
    backgroundColor: "#6495ED",
    justifyContent: "center",
    textAlign: "center",
    position: "relative",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },
  check: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: "auto",
  },
});

export default function Exercise() {
  const paperStyle = {
    top: "4em",
    padding: "4% 4%",
    width: "40%",
    margin: "1% auto",
    gap: "1%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    textAlign: "center",
  };
  const classes = useStyles();
  const [longExercises, setLongExercises] = useState(false);
  const [shortExercises, setShortExercises] = useState(false);
  const navigate = useNavigate();
  const openSolution = (e) => {
    if (longExercises[e.target.value].value) {
      navigate("/solutionRetake/" + longExercises[e.target.value].key.id);
    } else navigate("/solution/" + longExercises[e.target.value].key.id);
  };
  const openSolutionAbc = (e) => {
    if (shortExercises[e.target.value].value) {
      navigate("/solutionAbcRetake/" + shortExercises[e.target.value].key.id);
    } else navigate("/solutionabc/" + shortExercises[e.target.value].key.id);
  };
  useEffect(() => {
    fetch("http://localhost:8080/exercise/programming", {
      method: "GET",
      headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
    })
      .then((res) => res.json())
      .then((result) => {
        setLongExercises(result);
      })
      .catch((error) => console.error("Error:", error));
    fetch("http://localhost:8080/exercise/abc", {
      method: "GET",
      headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
    })
      .then((res) => res.json())
      .then((result) => {
        setShortExercises(result);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        <div
          className={classes.mainContainer}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "3% 1%",
          }}
        >
          <Paper style={paperStyle}>
            <div>
              {!longExercises.length && !shortExercises.length && (
                <CircularProgress />
              )}
              {longExercises.length > 0 && <h3>Zadania programistyczne</h3>}
              {longExercises.length > 0 &&
                longExercises.map((exercise, index) => (
                  <Paper
                    elevation={6}
                    style={{ padding: "15px", textAlign: "left" }}
                    key={index}
                  >
                    <div
                      className={classes.headerContainer}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3>{exercise.key.name}</h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <p>Punkty do zdobycia:</p>
                      </div>
                      <Box className={classes.points}>
                        {exercise.key.maxPoints}
                      </Box>
                      {exercise.value ? (
                        <div className={classes.check}>
                          <CheckIcon />
                          <span>Zrobione</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Button
                          variant="contained"
                          value={index}
                          style={{ backgroundColor: "#001f3f" }}
                          onClick={openSolution}
                        >
                          Wykonaj
                        </Button>
                      </Box>
                    </div>
                  </Paper>
                ))}
              {shortExercises.length > 0 && <h3>Zadania teoretyczne</h3>}
              {shortExercises.length > 0 &&
                shortExercises.map((exercise, index) => (
                  <Paper
                    elevation={6}
                    style={{ padding: "15px", textAlign: "left" }}
                    key={index}
                  >
                    <div
                      className={classes.headerContainer}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h3>{exercise.key.name}</h3>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <p>Punkty do zdobycia:</p>
                      </div>
                      <Box className={classes.points}>
                        {exercise.key.maxPoints}
                      </Box>
                      {exercise.value ? (
                        <div className={classes.check}>
                          <CheckIcon />
                          <span>Zrobione</span>
                        </div>
                      ) : null}
                    </div>

                    <div>
                      <Box display="flex" flexDirection="column" gap={2}>
                        <Button
                          variant="contained"
                          value={index}
                          style={{ backgroundColor: "#001f3f" }}
                          onClick={openSolutionAbc}
                        >
                          Wykonaj
                        </Button>
                      </Box>
                    </div>
                  </Paper>
                ))}
            </div>
          </Paper>
        </div>
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
