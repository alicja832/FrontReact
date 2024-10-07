import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContactSupportOutlined } from "@mui/icons-material";
import { getLogin, getRole } from "./api/TokenService";
import MyParticles from "./MyParticles";

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
    gap: "20px", // Odstęp między h3 a Box
  },
});

const StudentProfile = () => {
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
  const [student, setStudent] = useState(null);
  const [exercisesWithScores, setExercisesWithScores] = useState([]);
  const [buttonExercise, setbuttonExercise] = useState(true);

  const retake = (e) => {
    navigate("/solutionRetake/:" + e.target.value);
  };

  function fetchStudentExercises() {
    fetch("http://localhost:8080/exercise/solutions/" + student.name, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
      	if(result.length!=0)
      		setbuttonExercise(false);
        console.log("Fetched students:", result); // Dodaj t
        setExercisesWithScores(result);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }
  useEffect(() => {
    fetch("http://localhost:8080/user/student/" + getLogin())
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched students:", result);
        setStudent(result[0]);
      })
      .catch((error) => console.error("Error:", error));
  },[]);
  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <MyParticles></MyParticles>
      <div id="sthelse">
        <Paper elevation={3} style={paperStyle}>
          <h2>Student Profile</h2>
          <p>Username: {student.name}</p>
          <p>Email: {student.email}</p>
          <p>Twój wynik: {student.score}</p>
        </Paper>
        {
          <Paper elevation={3} style={paperStyle}>
           {buttonExercise && (<Box display="flex" flexDirection="column" gap={2}>
            <Button style={buttonStyle} onClick={fetchStudentExercises}>
              Zobacz swoje rozwiązania
            </Button>
             </Box>)}
            {exercisesWithScores.map((exercise) => (
              <Paper
                elevation={6}
                style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                key={exercise.id}
              >
                <div className={classes.headerContainer}>
                  {" "}
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
      </div>
    </div>
  );
};

export default StudentProfile;
