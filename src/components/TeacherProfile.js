import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { Container, Paper, Button, Box } from "@mui/material";
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLogin } from "./api/TokenService";
import MyParticles from "./MyParticles";
import Font from "react-font";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserLarge } from '@fortawesome/free-solid-svg-icons'

const useStyles = makeStyles((theme) => ({
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
}));

const TeacherProfile = () => {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    top: "4em",
    padding: "5%",
    width: "90%",
    margin: "3% auto",
    position: "relative",
    textAlign: "center",
  };

  const buttonStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    width: "40%",
  };
  const classes = useStyles();
  const [id, setId] = useState(0);
  const [indexofExercise, setIndexofExercise] = useState(0);
  const [teacher, setTeacher] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [maxPoints, setmaxPoints] = useState("");
  const [correctSolution, setcorrectSolution] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormTwoVisible, setIsFormTwoVisible] = useState(false);
  const [isExercises, setisExercises] = useState(false);
  const [errorMessage, seterrorMessage] = useState(false);
  const [errorWindowShown, seterrorInfoWindowShown] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setcorrectSolution(
        (prevContent) =>
          prevContent.substring(0, selectionStart) +
          "\t" +
          prevContent.substring(selectionEnd)
      );
      setTimeout(() => {
        e.target.selectionStart = selectionStart + 1;
        e.target.selectionEnd = selectionStart + 1;
      }, 0);
    }
  };

  const showForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    console.log(correctSolution);
  };

  const showFormTwo = (e) => {
    
    setIsFormTwoVisible(true);
    setIndexofExercise(e.target.value);
    const found = exercises[e.target.value];
    setId(found.id);
    setContent(found.content);
    setName(found.name);
    setIntroduction(found.introduction);
    setcorrectSolution(found.correctSolution);
    setmaxPoints(found.maxPoints);
  };

  const closeFormTwo = () => {
    setIsFormTwoVisible(false);
  };

  const deleteExercise = (e) => {
    const url = "http://localhost:8080/exercise/delete/" + e.target.value;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: e.target.value,
    }).then(() => {
      window.location.reload();
    });
  };

  const editExercise = (e) => {
    
  
    const exercise = {
      id,
      name,
      introduction,
      content,
      teacher,
      maxPoints,
      correctSolution,
    };
    const url = "http://localhost:8080/exercise";

    fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    }).then(() => {
      closeFormTwo();
      window.location.reload();
    });

    closeForm();
    setName("");
    setContent("");
    setmaxPoints("");
    setcorrectSolution("");
  };

  const addExercise = (e) => {
    e.preventDefault();
    if(maxPoints.parseInt() === NaN )
    {
        seterrorInfoWindowShown(true);
        seterrorMessage("Wprowadzono złe dane.");
    }
    const exercise = {
      name,
      introduction,
      content,
      maxPoints,
      correctSolution,
      teacher,
    };

    const url = "http://localhost:8080/exercise/";
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(exercise),
    }).then((res) => {
      var info = res.body;
      console.log(info);
      seterrorInfoWindowShown(true);
      seterrorMessage("Niepoprawny kod pythona, zwraca Error.");
      window.location.reload();
    });
    closeForm();
    setName("");
    setContent("");
    setmaxPoints("");
    setcorrectSolution("");
  };

  useEffect(() => {
    fetch("http://localhost:8080/user/teacher/" + getLogin())
      .then((res) => res.json())
      .then((result) => {
        setTeacher(result[0]);
      })
      .catch((error) => console.error("Error:", error));

    fetch("http://localhost:8080/user/exercises/" + getLogin())
      .then((res) => res.json())
      .then((result) => {
        setExercises(result);
        if (result.length !== 0) setisExercises(true);
        console.log(result);
      });
  }, []);

  if (!teacher) {
    return <div>Loading...</div>;
  }
  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }
  return (
    <div>
      <MyParticles></MyParticles>

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
          <Paper elevation={3} style={paperStyle}>
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
                  <h2>Profil nauczyciela</h2>
                  <p>{teacher.name}</p>
                  <p>{teacher.email}</p>
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
                <AccountBoxIcon sx={{ margin: "1px" }} fontSize="large" />
              </div>
            </div>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center" // Wyśrodkowanie poziome
              alignItems="center"
              gap={2}
            >
              <Button
                style={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={showForm}
              >
                Dodaj zadanie
              </Button>
            </Box>
          </Paper>
        </div>
      </div>
      <div
        className={classes.mainContainer}
        style={{
          display: "flex",
          justifyContent: "space-between", 
          alignItems: "flex-start",
          padding: "10%", 
        }}
      >
        {isExercises && (
          <Paper elevation={3} style={paperStyle}>
            <h3>Twoje zadania:</h3>
            {exercises.map((exercise, index) => (
              <Paper
                elevation={6}
                style={{
                  margin: "10px",
                  padding: "15px",
                  textAlign: "left",
                }}
                key={exercise.id}
              >
                <div
                  className={classes.headerContainer}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexDirection:"row"
                  }}
                >
                  <h3>{exercise.name}</h3>

                  {!isFormTwoVisible && (
                    <div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          marginLeft: "auto",
                        }}
                      >
                        <Box display="flex" flexDirection="row" gap={2}>
                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={exercise.id}
                            color="inherit"
                            onClick={deleteExercise}
                          >
                            Usuń
                          </Button>
                        </Box>
                        <Box display="flex" flexDirection="row" gap={2}>
                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={index}
                            color="inherit"
                            onClick={showFormTwo}
                          >
                            Edytuj
                          </Button>
                        </Box>
                      </div>
                    </div>
                  )}
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </div>
      {isFormTwoVisible && (
                    <Container>
                      <Paper elevation={3} style={paperStyle}>
                        <form
                          className={classes.root}
                          noValidate
                          autoComplete="off"
                        >
                          <TextField
                            id="outlined-basic"
                            label="Nazwa"
                            variant="outlined"
                            fullWidth
                            defaultValue={exercises[indexofExercise].name}
                            onChange={(e) => setName(e.target.value)}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Treść"
                            variant="outlined"
                            fullWidth
                            defaultValue={exercises[indexofExercise].content}
                            onChange={(e) => setContent(e.target.value)}
                          />

                          <TextField
                            id="outlined-basic"
                            label="Wstęp teoretyczny"
                            variant="outlined"
                            fullWidth
                            defaultValue={exercises[indexofExercise].introduction}
                            onChange={(e) => setIntroduction(e.target.value)}
                          />
                          <Textarea
                            sx={{ backgroundColor: "#FDF5E6" }}
                            minRows={2}
                            id="outlined-basic"
                            label="Poprawne rozwiązanie"
                            placeholder="Poprawne rozwiązanie"
                            variant="outlined"
                            fullWidth
                            defaultValue={exercises[indexofExercise].correctSolution}
                            onChange={(e) => setcorrectSolution(e.target.value)}
                          />
                          <TextField
                            id="outlined-basic"
                            label="max ilość punktów"
                            variant="outlined"
                            fullWidth
                            defaultValue={exercises[indexofExercise].maxPoints}
                            onChange={(e) => setmaxPoints(e.target.value)}
                          />

                          <FormControl fullWidth></FormControl>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Box display="flex" flexDirection="column" gap={2}>
                              <Button
                                style={buttonStyle}
                                variant="contained"
                                color="secondary"
                                value={indexofExercise}
                                onClick={editExercise}
                              >
                                Zmień
                              </Button>
                            </Box>
                          </div>
                        </form>
                      </Paper>
                    </Container>
                  )}
      {isFormVisible && (
        <div
          className={classes.mainContainer}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            padding: "10%",
          }}
        >
          <Paper elevation={3} style={paperStyle}>
            <h3>Dodaj zadanie</h3>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Nazwa"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <TextField
                id="outlined-basic"
                label="Wstęp teoretyczny"
                variant="outlined"
                fullWidth
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                label="Treść"
                variant="outlined"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <Textarea
                sx={{ backgroundColor: "#FDF5E6" }}
                minRows={2}
                id="outlined-basic"
                label="Poprawne rozwiązanie"
                placeholder="Poprawne rozwiązanie"
                variant="outlined"
                fullWidth
                value={correctSolution}
                onChange={(e) => setcorrectSolution(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <TextField
                id="outlined-basic"
                label="max ilość punktów"
                variant="outlined"
                fullWidth
                value={maxPoints}
                onChange={(e) => setmaxPoints(e.target.value)}
              />

              <FormControl fullWidth></FormControl>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="secondary"
                    onClick={addExercise}
                  >
                    Dodaj
                  </Button>
                </Box>
              </div>
              <Toast message={errorMessage}></Toast>
            </form>
          </Paper>
        </div>
      )}
    </div>
  );
};

export default TeacherProfile;
