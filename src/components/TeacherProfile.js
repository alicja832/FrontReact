import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { Container, Paper, Button, Box } from "@mui/material";
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getLogin,getRole } from "./api/TokenService";
import MyParticles from "./MyParticles";

const useStyles = makeStyles((theme) => ({}));
const TeacherProfile = () => {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    padding: "50px 20px",
    width: "90%",
    margin: "30px auto",
    position: "relative",
  };
  const buttonStyle = { backgroundColor: "#001f3f", color: "white" };
  const classes = useStyles();
  const [id, setId] = useState(0);
  const [teacher, setTeacher] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [maxPoints, setmaxPoints] = useState("");
  const [correctSolution, setcorrectSolution] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormTwoVisible, setIsFormTwoVisible] = useState(false);

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
    setId(e.target.value);

    function isEqual(a) {
      return a.id === parseInt(e.target.value);
    }

    const found = exercises.find(isEqual);
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
    }).then(() => {
      window.location.reload();
      console.log("New exercise added");
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
        console.log("Fetched students:", result);
        setTeacher(result[0]);
      })
      .catch((error) => console.error("Error:", error));
    
 

      fetch("http://localhost:8080/user/exercises/"+getLogin())
        .then((res) => res.json())
        .then((result) => {
          setExercises(result);
                });
      
      
    },[]);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    //tutaj
    <div>
      <MyParticles></MyParticles>

      <div id="sthelse">
        <Container>
          <Paper style={paperStyle}>
            <div>
              <h2>Twój profil </h2>
              <p>Imię: {teacher.name}</p>
              <p>Email: {teacher.email}</p>
              {/* Add more fields as necessary */}
            </div>
          </Paper>
          {isFormVisible && (
            <Container>
              <Paper elevation={3} style={paperStyle}>
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
                </form>
              </Paper>
            </Container>
          )}
          <Container>
            {(exercises.length !== 0 || isFormTwoVisible) && (
              <Paper elevation={3} style={paperStyle}>
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
                    <h3>{exercise.name}</h3>
                    <br />
                    {!isFormTwoVisible && (
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
                            value={exercise.id}
                            color="inherit"
                            onClick={deleteExercise}
                          >
                            Usuń
                          </Button>

                          <Button
                            style={buttonStyle}
                            variant="contained"
                            value={exercise.id}
                            color="inherit"
                            onClick={showFormTwo}
                          >
                            Edytuj
                          </Button>
                        </Box>
                      </div>
                    )}
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
                              defaultValue={exercise.name}
                              onChange={(e) => setName(e.target.value)}
                            />

                            <TextField
                              id="outlined-basic"
                              label="Treść"
                              variant="outlined"
                              fullWidth
                              defaultValue={exercise.content}
                              onChange={(e) => setContent(e.target.value)}
                            />

                            <TextField
                              id="outlined-basic"
                              label="Wstęp teoretyczny"
                              variant="outlined"
                              fullWidth
                              defaultValue={exercise.introduction}
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
                              defaultValue={exercise.correctSolution}
                              onChange={(e) =>
                                setcorrectSolution(e.target.value)
                              }
                            />
                            <TextField
                              id="outlined-basic"
                              label="max ilość punktów"
                              variant="outlined"
                              fullWidth
                              defaultValue={exercise.maxPoints}
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
                              <Box
                                display="flex"
                                flexDirection="column"
                                gap={2}
                              >
                                <Button
                                  style={buttonStyle}
                                  variant="contained"
                                  color="secondary"
                                  value={index}
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
                  </Paper>
                ))}
              </Paper>
            )}
            {!isFormVisible && (
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
                    onClick={showForm}
                  >
                    Dodaj zadanie
                  </Button>
                </Box>
              </div>
            )}
          </Container>
        </Container>
      </div>
    </div>
  );
};

export default TeacherProfile;
