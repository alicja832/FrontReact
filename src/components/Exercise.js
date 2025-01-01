import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Paper, Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import Solution from "./Solution.js"
import SolutionAbc from "./SolutionAbc.js"
const useStyles = makeStyles({});

export default function Exercise() {
  
  const paperStyle = {
    top: "4em",
    padding: "4% 4%",
    width: "60%",
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
      navigate("/profil");
    } 
    else
    {
      var longExercise = longExercises[e.target.value];
      navigate("/solution",{state:{exercise:{longExercise}}});
    } 
  
  };
  const openSolutionAbc = (e) => {
    
    if (shortExercises[e.target.value].value) {
      navigate("/profil");
    } 
    else{
      
      var shortExercise = shortExercises[e.target.value];
      navigate("/solutionabc",{state:{exercise:{shortExercise}}});
    } 
  
  };
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/exercise/programming`, {
      method: "GET",
      headers: getToken() ? { Authorization: `Bearer ${getToken()}` } : {},
    })
      .then((res) => res.json())
      .then((result) => {
        setLongExercises(result);
      })
      .catch((error) => console.error("Error:", error));
    fetch(`${process.env.REACT_APP_API_URL}/exercise/abc`, {
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
    <div className="main-container">
      <div className="first-container">
        <div
          className={classes.mainContainer}
          style={{
            display: "flex",
           
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
                    <div className="main-row">
                      <div className="header-container-exercise">
                        <h3>{exercise.key.name}</h3>
                      </div>
                      <div className="right-info-exercise">
                        <p>Punkty do zdobycia:</p>

                        <Box className="points">{exercise.key.maxPoints}</Box>
                        {exercise.value ? (
                          <div className="check">
                            <CheckIcon />
                            <span>Zrobione</span>
                          </div>
                        ) : null}
                      </div>
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
                    <div className="main-row">
                      <div className="header-container-exercise">
                        <h3>{exercise.key.name}</h3>
                      </div>
                      <div className="right-info-exercise">
                        <p>Punkty do zdobycia:</p>

                        <Box className="points">{exercise.key.maxPoints}</Box>

                        {exercise.value ? (
                          <div className="check">
                            <CheckIcon />
                            <span>Zrobione</span>
                          </div>
                        ) : null}
                      </div>
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
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
