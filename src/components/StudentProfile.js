import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "./api/TokenService";
import MyParticles from "./MyParticles";
import Font from "react-font";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Profile from "./Profile";

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
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },
});

const StudentProfile = (user) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    padding: "50px 20px",
    width: 600,
    margin: "20px auto",
    position: "relative",
  };
  const buttonStyle = { backgroundColor: "#001f3f", color: "white" };
  const [exercisesWithScores, setExercisesWithScores] = useState([]);
  const [buttonExercise, setbuttonExercise] = useState(true);
  const [student, setStudent] = useState(null);
  const retake = (e) => {
    navigate("/solutionRetake/:" + e.target.value);
  };
  const click=()=>{
    fetch("http://localhost:8080/exercise/solutions/", {
      headers: { Authorization:`Bearer ${getToken()}`},
      method: "GET"
    })
      .then((res) => res.json())
      .then((result) => { 
        if (result.length !== 0) setbuttonExercise(false);
        console.log("Fetched students:", result); // Dodaj t
        setExercisesWithScores(result);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }
  
  useEffect(() => {
    setStudent(user.user);
    console.log(user.user.name);
   
  });

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MyParticles></MyParticles>
      <div id="sthelse">
        <Container>
          <Paper elevation={1} style={paperStyle}>
            <div>
              <AccountBoxIcon sx={{ margin: "1px" }} />
              <Font family="tahoma">
                <h2>Profil ucznia</h2>
                <p>{student.name}</p>
              </Font>
            </div>
          </Paper>
          <Paper elevation={1} style={paperStyle}>
            <div>
              <Font family="tahoma">
                <h2>Twoje dane</h2>
              </Font>
              <p>{student.email}</p>
              <Font family="tahoma">
                <h2>Twój wynik</h2>
              </Font>
              <Box className={classes.points}>{student.score}</Box>
            </div>
            <button onClick = {click}></button>
          </Paper>
          {
            <Paper elevation={1} style={paperStyle}>
             
              {exercisesWithScores.length!==0 && exercisesWithScores.map((exercise) => (
                <Paper
                  elevation={6}
                  style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                  key={exercise.id}
                >
                  <div className={classes.headerContainer}>
                    <h3> {exercise.name}</h3>
                    <p>Twój wynik:</p>
                    <Box className={classes.points}>{exercise.score}</Box>
                  </div>

                  <div>
                    <Box display="flex" flexDirection="column" gap={2}>
                      <Button
                        style={{ backgroundColor: "#001f3f" }}
                        variant="contained"
                        value={parseInt(exercise.id)}
                        onClick={retake}
                        color="secondary"
                      >
                        Wykonaj ponownie
                      </Button>
                    </Box>
                  </div>
                </Paper>
              ))}
            </Paper>
          }
        </Container>
      </div>
    </div>
  );
};

export default StudentProfile;
