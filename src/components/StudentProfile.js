import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import studentlogo from "../student.jpeg";
import Font from "react-font";
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
    textAlign: "center",
  };
  const paperStyleTwo = {
    padding: "3% 3%",
    width: "100%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    borderRadius: "10px",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };
  const buttonStyle = { backgroundColor: "#001f3f", color: "white" };
  const [exercisesWithScores, setExercisesWithScores] = useState([]);
  const [student, setStudent] = useState(null);
  const retake = (e) => {
    //tutaj jestem za tym zeby przeniesc rzeczy wszystkie pobrane jako propsy
    navigate("/solutionRetake/:" + e.target.value);
  };
  const click = () => {
    fetch("http://localhost:8080/exercise/solutions", {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExercisesWithScores(result);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    setStudent(user.user);
    console.log(user.user);
    click();
  }, [student]);
  if (!student)
    return (
      <div>
        <CircularProgress />
      </div>
    );

  return (
    <div>
      <div
        className={classes.mainContainer}
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "10%",
        }}
      >
        <div
          style={{ display: "flex", flexBasis: "60%", flexDirection: "column" }}
        >
          <Paper elevation={1} style={paperStyle}>
            <div
              className={classes.mainContainer}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "60%",
                }}
              >
                <Font family="tahoma">
                  <h2>Profil ucznia:</h2>
                  <p>{student.name}</p>
                  <p>{student.email}</p>
                  <h4>Twój wynik:</h4>
                  <p>{student.score}</p>
                </Font>
              </div>

              <div
                className={classes.textFieldContainer}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "40%",
                }}
              >
                <Paper elevation={3}>
                  <img
                    src={studentlogo}
                    alt="Logo"
                    style={{
                      height: "140px",
                      width: "200px",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                </Paper>
              </div>
            </div>
          </Paper>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flexBasis: "40%",
          }}
        >
          <Paper elevation={1} style={paperStyleTwo}>
            <Font family="sans-serif">
              <h3>Jako uczeń możesz rozwiązywać zadania:</h3>
              <h4>Na zadanie składa się:</h4>

              <li>
                Wstęp teoretyczny informujący, jakich zagadnień teoretycznych ma
                dotyczyć zadanie (zarówno teoria samego języka programowania jak
                i teoria z zagadnień algorytmicznych), który ma pomóc w
                rozwiązaniu.
              </li>
              <li>Treść zadania, która informuje, co należy zrobić </li>
              <li>Twoja propozycja rozwiązania</li>
              <li>Maksymalną ilość punktów do zdobycia za dane zadanie</li>
              <h3>Możesz także poprawiać swoje rozwiązania</h3>
            </Font>
          </Paper>
        </div>
      </div>

      <div>
        {exercisesWithScores.length != 0 && (
          <Paper elevation={1} style={paperStyle}>
            <h3>Zadania, które rozwiązałeś:</h3>
            {exercisesWithScores.map((solution, index) => (
              <Paper
                elevation={6}
                style={{
                  margin: "10px",
                  padding: "15px",
                  textAlign: "left",
                }}
                key={solution.id}
              >
                <div
                  className={classes.headerContainer}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <p>{solution.name}</p>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <p>Twój wynik:</p>
                  </div>
                  <Box className={classes.points}>{solution.score}</Box>
                </div>

                <div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      marginLeft: "auto",
                    }}
                  >
                    <Button
                      style={buttonStyle}
                      variant="contained"
                      value={solution.id}
                      color="inherit"
                      onClick={retake}
                    >
                      Wykonaj ponownie
                    </Button>
                  </div>
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
