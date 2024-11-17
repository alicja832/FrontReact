import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Paper, Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import "./Exercise.css";

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
  check:{
    display : "flex",
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
    navigate("/solution/" + e.target.value);
  };
  const openSolutionAbc = (e) => {
    navigate("/solutionabc/" + e.target.value);
  };
  useEffect(() => {
    if (getToken()) {
      fetch("http://localhost:8080/exercise/programming", {
        method: "GET",
        headers: { Authorization: `Bearer ${getToken()}` },
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setLongExercises(result);
        })
        .catch((error) => console.error("Error:", error));
        fetch("http://localhost:8080/exercise/abc", {
          method: "GET",
          headers: { Authorization: `Bearer ${getToken()}` },
        })
          .then((res) => res.json())
          .then((result) => {
            console.log(result);
            setShortExercises(result);
          })
          .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:8080/exercise/programming")
        .then((res) => res.json())
        .then((result) => {
          setLongExercises(result);
          console.log(result);
          
        })
        .catch((error) => console.error("Error:", error));
        fetch("http://localhost:8080/exercise/abc")
        .then((res) => res.json())
        .then((result) => {
          setShortExercises(result);
          console.log(result);
        })
        .catch((error) => console.error("Error:", error));
    }
  
  }, []);

  return (
    <div>
      <div className={classes.container}>
        <Paper style={paperStyle}>
          
          <div>
            {!longExercises.length && !shortExercises.length  && <CircularProgress />}
            {longExercises.length>0 && (<h3>Zadania programistyczne</h3>)}
            {longExercises.length>0 &&
              longExercises.map((exercise) => (
                <Paper
                  elevation={6}
                  style={{ padding: "15px", textAlign: "left" }}
                  key={exercise.key.id}
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
                        value={exercise.key.id}
                        style={{ backgroundColor: "#001f3f" }}
                        onClick={openSolution}
                      >
                        Wykonaj
                      </Button>
                    </Box>
                  </div>
                </Paper>
                
              ))}
              {shortExercises.length>0 && (<h3>Zadania teoretyczne</h3>)}
               {shortExercises.length>0 &&
             shortExercises.map((exercise) => (
                <Paper
                  elevation={6}
                  style={{ padding: "15px", textAlign: "left" }}
                  key={exercise.key.id}
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
                        value={exercise.key.id}
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
  );
}
