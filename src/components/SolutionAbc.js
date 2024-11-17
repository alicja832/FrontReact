import React, { useEffect, useState } from "react";
import { Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
import Font from "react-font";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";

const useStyles = makeStyles({
  position: "relative",
  container: {
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
    gap: "1%",
  },
  textFieldContainer: {
    position: "relative",
    width: "90%",
    padding: " 1% 1%",
    border: "1%",
    borderStyle: "solid",
    borderColor: "white",
    backgroundColor: "grey",
    display: "flex",
    fontWeight: "bold",
    alignItems: "center",
    gap: "1%",
  },
  textField: {
    position: "relative",
    height: "500px",
    width: "100%",
    backgroundColor: "#000",
    color: "#fff",
    "& .MuiInputBase-input": {
      color: "#fff",
    },
    "& .MuiFormLabel-root": {
      color: "#fff",
    },
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    margin: "2%",
    gap: "20px",
    position: "relative",
  },
  button: {
    position: "relative",
    color: "#fff",
    backgroundColor: "#000",
  },
  output: {
    position: "relative",
    backgroundColor: "#000 !important",
    color: "#fff !important",
    padding: "1%",
    width: "100%",
    marginTop: "1%",
    display: "block",
    justifyContent: "center",
    flexDirection: "row",
    fontWeight: "lighter",
  },
});

export default function SolutionAbc({ task }) {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
  };
  const paperStyleTwo = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  };

  const classes = useStyles();
  const [output, setOutput] = useState("");
  const [answer, setAnswer] = useState("");
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setinfoMessage] = useState(0);
  const [user, setUser] = useState(null);
  const handlechangeA = () => {
    setAnswer("A");
  };
  const handlechangeB = () => {
    setAnswer("B");
  };
  const handlechangeC = () => {
    setAnswer("C");
  };
  const handlechangeD = () => {
    setAnswer("D");
  };
  const save = () => {
    var student = null;
    const solution = { exercise, student, score, answer };
    fetch("http://localhost:8080/exercise/solution/abc", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        setinfoMessage("Zapisano");
        setInfoWindowShown(true);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const check = () => {
    console.log(answer);
    var student = null;
    const solution = { exercise, student, score, answer };
    fetch("http://localhost:8080/exercise/abc/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setScore(result);
        setinfoMessage("Twój wynik to " + result.toString() + " pkt");
        setInfoWindowShown(true);
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3000);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetch("http://localhost:8080/exercise/one/abc/" + task, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        setExercise(result[0]);
      })
      .catch((error) => console.error("Error fetching students:", error));
    if (getToken()) {
      fetch("http://localhost:8080/user/", {
        headers: { Authorization: `Bearer ${getToken()}` },
        method: "GET",
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          setUser(result[0]);
        });
    }
  }, []);

  if (!exercise) {
    return <div>Loading...</div>;
  }

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div>
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
            <Font family="tahoma">
              <p>{exercise.introduction}</p>
            </Font>
          </Paper>
          <Paper elevation={3} style={paperStyle}>
            <Font family="sans-serif">
              <p>{exercise.content}</p>
            </Font>
            <h4>Maksymalna ilość punktów: </h4>
            <p> {exercise.maxPoints} </p>
          </Paper>
        </div>

        <div style={{ flexBasis: "50%", flexDirection: "column" }}>
          <Paper elevation={3} style={paperStyleTwo}>
            <h4>{exercise.content}</h4>
            <h4>Wybierz jedną odpowiedź: </h4>
            <FormControlLabel
              label={exercise.firstOption}
              value={exercise.firstOption}
              control={
                <Checkbox
                  onChange={handlechangeA}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
            <FormControlLabel
              label={exercise.secondOption}
              control={
                <Checkbox
                  onChange={handlechangeA}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
            <FormControlLabel
              label={exercise.thirdOption}
              control={
                <Checkbox
                  onChange={handlechangeC}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
            {exercise.fourthOption && (
              <FormControlLabel
                label={exercise.fourthOption}
                control={
                  <Checkbox
                    onChange={handlechangeD}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
              />
            )}
            <Button
              style={{ backgroundColor: "#001f3f" }}
              variant="contained"
              color="secondary"
              onClick={check}
            >
              Sprawdź
            </Button>
            <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>
            <Box display="inline" flexDirection="column" gap={2}>
              {user && user.score >= 0 && (
                <Button
                  style={{ backgroundColor: "#001f3f" }}
                  variant="contained"
                  color="secondary"
                  onClick={save}
                >
                  Zapisz rozwiązanie
                </Button>
              )}
            </Box>
          </Paper>
        </div>
      </div>
    </div>
  );
}
