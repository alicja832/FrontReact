import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import studentlogo from "../student.jpeg";
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
    width:"50%",
    margin: "2% auto",
    position: "relative",
    textAlign: "center",
  };
  const paperStyleFirst = {
    top: "4em",
    backgroundColor: "#FDF5E6",
    padding: "3% 2%",
    width:"90%",
    margin: "2% auto",
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
  const [position, setPosition] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const retake = (e) => {
    navigate("/solutionRetake/" + e.target.value);
  };
  const show = (e) => {
    navigate("/solutionAbcRetake/" + e.target.value);
  };
  const getInfo = () => {
    
    fetch("http://localhost:8080/solution/programming", {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExercisesWithScores(result);
      })
      .catch((error) => console.error("Error fetching students:", error));

    fetch("http://localhost:8080/user/position", {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPosition(result.key+1);
        setQuantity(result.value);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    setStudent(user.user);
    getInfo();
  },[user.user]);

  return (
    <div
           
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}
  >
           <div style={{ flex: 9, display: "flex", flexDirection: "column"  }}>
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
          <Paper elevation={1} style={paperStyleFirst}>
            <div
              className={classes.mainContainer}
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {!student&&(
                 <div>
                 <CircularProgress />
               </div>
              )}
              {(student)&&
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  flexBasis: "60%",
                }}
              >
          
                  <h2>Profil ucznia:</h2>
                  <p>{student.name}</p>
                  <p>{student.email}</p>
                  <h4>Twój wynik: {student.score} pkt</h4>
                  <p>Pozycja w rankingu: {position}</p>
                  <p>Liczba osób biorących udział w rywalizacji:{quantity}</p>
              
              </div>
                }
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
              <p>Uwaga! Ale tylko programistyczne!</p>
           
          </Paper>
        </div>
      </div>

      <div>
        {exercisesWithScores.length !== 0 && (
          <Paper elevation={1} style={paperStyle}>
            <h3>Zadania, które rozwiązałeś:</h3>
            {exercisesWithScores.map((solution) => (
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
                    {(solution.retakeposibility==="true") && <Button
                      style={buttonStyle}
                      variant="contained"
                      value={solution.id}
                      color="inherit"
                      onClick={retake}
                    >
                      Wykonaj ponownie
                    </Button>}
                   {(solution.retakeposibility==="false") &&  <Button
                      style={buttonStyle}
                      variant="contained"
                      value={solution.id}
                      color="inherit"
                      onClick={show}
                    >
                     Zobacz
                    </Button>}
                  </div>
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </div>
      </div>
      <div style={{flex: 1, display: "flex", flexDirection: "column" }}>
      <Footer />
      </div>
    </div>
  );
};

export default StudentProfile;
