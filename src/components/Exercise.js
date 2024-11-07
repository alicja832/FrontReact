import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { Paper, Button, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { getToken } from "./api/TokenService";
import MyParticles from "./MyParticles";
import CircularProgress from "@mui/joy/CircularProgress"
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
    textAlign: "center"
  };
  const classes = useStyles();
  const [exercises, setExercises] = useState([]);
  const [isExercises, setisExercises] = useState(false); 
  const navigate = useNavigate();
  const openSolution = (e) => {
    navigate("/solution/:" + e.target.value);
  };
//teraz endpointy nie beda wymagac emaila jako pathvariable - wystarczy tylko wziac dane z tokenu
  useEffect(() => {
   
    if (getToken()) {
      fetch("http://localhost:8080/exercise/" ,{
        method: "GET",
        headers: { Authorization:`Bearer ${getToken()}`},
      })  
        .then((res) => res.json())
        .then((result) => {
          console.log("Fetched students:", result);
          setExercises(result);
          if (result.length !== 0) setisExercises(true);
        })
        .catch((error) => console.error("Error:", error));
    } else {
      fetch("http://localhost:8080/exercise/"
      )
        .then((res) => res.json())
        .then((result) => {
          setExercises(result);
          console.log(result);
          if (result.length !== 0)  
          setisExercises(true);
        }).catch((error) => console.error("Error:", error));
    }
  }, []);

  return (
    <div>
      <MyParticles></MyParticles>
      <div className={classes.container}>
      <Paper style={paperStyle}>
      <div >
        {!isExercises && (<CircularProgress/>)}
        {isExercises && (
      
            exercises.map((exercise) => (
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
                  <Box className={classes.points}>{exercise.key.maxPoints}</Box>
                  {exercise.value ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "auto",
                      }}
                    >
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
            ))
        
        )}
      </div>
      </Paper>
      </div>
    </div>
  );
}