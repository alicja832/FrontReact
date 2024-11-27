import React, { useEffect, useState } from "react";
import { Paper, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { getToken } from "./api/TokenService";
// import Font from "react-font";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import { Checkbox } from "@mui/material";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";
import { Textarea } from "@mui/joy";
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
  const buttonStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    width: "40%",
    margin: "1%",
  };
  const paperStyleTwo = {
    backgroundColor: "#FDF5E6",
    fontWeight: "bold",
    margin: "2%",
    padding: "1%",
    textAlign: "center",
    display: "flex",
    marginTop: "3%",
    flexDirection: "column",
  };

  const classes = useStyles();
  const [checkedA, setCheckedA] = useState(false);
  const [checkedB, setCheckedB] = useState(false);
  const [checkedC, setCheckedC] = useState(false);
  const [checkedD, setCheckedD] = useState(false);
  const [answer, setAnswer] = useState("");
  const [exercise, setExercise] = useState(null);
  const [score, setScore] = useState(0);
  const [sent, setSent] = useState(false);
  const [infoWindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setinfoMessage] = useState(0);
  const [user, setUser] = useState(null);
  const handlechangeA = () => {
    setCheckedA(true);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(false);
    setAnswer("A");
  };
  const handlechangeB = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(false);
    setCheckedB(true);
    setAnswer("B");
  };
  const handlechangeC = () => {
    setCheckedA(false);
    setCheckedD(false);
    setCheckedC(true);
    setCheckedB(false);
    setAnswer("C");
  };
  const handlechangeD = () => {
    setCheckedA(false);
    setCheckedD(true);
    setCheckedC(false);
    setCheckedB(false);
    setAnswer("D");
  };
  const save = () => {
    var student = null;
    const solution = { exercise, student, score, answer };
    fetch("http://localhost:8080/solution/abc", {
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
    setSent(true);
    var student = null;
    const solution = { exercise, student, score, answer };
    fetch("http://localhost:8080/solution/abc/check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(solution),
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setScore(result);
        result > 0
          ? setinfoMessage("Prawidłowa odpowiedź")
          : setinfoMessage("Niepoprawna odpowiedź");
        setInfoWindowShown(true);
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3000);
        return;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setSent(false);
  };

  useEffect(() => {
   
    fetch("http://localhost:8080/exercise/one/abc/" + task, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result[0].introduction);
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
        }).catch((error)=>{
          console.log(error);
        })
    }
  }, []);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <div style={{ flex: 9, display: "flex", flexDirection: "column" }}>
        {!exercise && (
          <div>
            <CircularProgress />
          </div>
        )}
        {exercise && (
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
                {/* <Font family="tahoma"> */}
                  <Textarea defaultValue={exercise.introduction}></Textarea>
                {/* </Font> */}
                <h4>Maksymalna ilość punktów:  {exercise.maxPoints}</h4>
              </Paper>
            </div>

            <div style={{ flexBasis: "50%", flexDirection: "column" }}>
              <Paper elevation={3} style={paperStyleTwo}>
                <h4>{exercise.content}</h4>
                <h4>Wybierz jedną odpowiedź: </h4>
                <FormControl fullWidth>
                  <FormGroup>
                    <FormControlLabel
                      requeired={true}
                      label={"A. " + exercise.firstOption}
                      value={exercise.firstOption}
                      control={
                        <Checkbox onChange={handlechangeA} checked={checkedA} />
                      }
                    />
                    <FormControlLabel
                      label={"B. " + exercise.secondOption}
                      control={
                        <Checkbox onChange={handlechangeB} checked={checkedB} />
                      }
                    />
                    <FormControlLabel
                      label={"C. " + exercise.thirdOption}
                      control={
                        <Checkbox onChange={handlechangeC} checked={checkedC} />
                      }
                    />
                    {exercise.fourthOption && (
                      <FormControlLabel
                        label={"D. " + exercise.fourthOption}
                        control={
                          <Checkbox
                            onChange={handlechangeD}
                            checked={checkedD}
                          />
                        }
                      />
                    )}
                  </FormGroup>
                  <Box
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                  >
                    
                  </Box>
                </FormControl>
                <Box> {!infoWindowShown && sent && <CircularProgress />}</Box>
                <Box>{infoWindowShown && <Toast message={infoMessage} />}</Box>
                <Box display="inline" flexDirection="column" gap={2}>
                  {user && user.score >= 0 && !infoWindowShown && (
                    <Button
                      style={{ backgroundColor: "#001f3f" }}
                      variant="contained"
                      color="secondary"
                      onClick={save}
                    >
                      Zapisz rozwiązanie
                    </Button>
                  )}
                   {!user  && (
                    <Button
                    style={buttonStyle}
                    variant="contained"
                    color="secondary"
                    onClick={check}
                  >
                    Sprawdź
                  </Button>
                  )}
                </Box>
              </Paper>
            </div>
          </div>
        )}
      </div>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
