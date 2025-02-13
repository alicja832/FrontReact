import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getToken } from "./api/TokenService";
import CircularProgress from "@mui/joy/CircularProgress";
import studentlogo from "../student.jpeg";
import Footer from "./semi-components/Footer";
const useStyles = makeStyles({});

const StudentProfile = (user) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    padding: "50px 20px",
    width: "50%",
    margin: "2% auto",
    position: "relative",
    textAlign: "center",
  };
  const paperStyleFirst = {
    top: "4em",
    backgroundColor: "#FDF5E6",
    padding: "3% 2%",
    width: "90%",
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
    fetch(`${process.env.REACT_APP_API_URL}/solution/`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setExercisesWithScores(result);
      })
      .catch((error) => console.error("Error fetching students:", error));

    fetch(`${process.env.REACT_APP_API_URL}/user/position`, {
      headers: { Authorization: `Bearer ${getToken()}` },
      method: "GET",
    })
      .then((res) => res.json())
      .then((result) => {
        setPosition(result.key + 1);
        setQuantity(result.value);
      })
      .catch((error) => console.error("Error fetching students:", error));
  };

  useEffect(() => {
    setStudent(user.user);
    getInfo();
  }, [user.user]);

  return (
    <div className="main-container">
      <div className="first-container">
        {!student && (
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
            style={{
              display: "flex",
              flexBasis: "60%",
              flexDirection: "column",
            }}
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
                {!student && (
                  <div>
                    <CircularProgress />
                  </div>
                )}
                {student && (
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
                )}
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
              <p>
                Nie masz również możliwości poprawy zadań usuniętych przez ich
                twórcę.
              </p>
              <p>
                Jeśli zadanie zostało zmienione, twój wynik jest obliczony na
                podstawie wersji, która została przez Ciebie wykonana.
              </p>
            </Paper>
          </div>
        </div>

        <div>
          {exercisesWithScores.length !== 0 && (
            <Paper elevation={1} style={paperStyle}>
              <h3>Zadania, które rozwiązałeś:</h3>
              {exercisesWithScores.map((solution) => (
                <Paper elevation={6} key={solution.id}>
                  <div className="main-row">
                    <div className="header-container-exercise">
                      <p>{solution.name}</p>
                    </div>

                    <div className="right-info-exercise">
                      <p>Twój wynik:</p>

                      <Box className="points">{solution.score}</Box>

                      <div className="button-exercise">
                        {solution.retakeposibility === "true" && (
                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={solution.id}
                            color="inherit"
                            onClick={retake}
                          >
                            Wykonaj ponownie
                          </Button>
                        )}
                        {solution.retakeposibility === "deleted" && (
                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={solution.id}
                            color="inherit"
                          >
                            Brak dostępu
                          </Button>
                        )}
                        {solution.retakeposibility === "false" && (
                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={solution.id}
                            color="inherit"
                            onClick={show}
                          >
                            Zobacz
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Paper>
              ))}
            </Paper>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default StudentProfile;
