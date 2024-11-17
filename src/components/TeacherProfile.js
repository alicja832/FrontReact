import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { Container, Paper, Button, Box } from "@mui/material";
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getToken } from "./api/TokenService";
import Font from "react-font";
import { classInfo } from "./semi-components/MyParticles";
import teacherlogo from "../teacher.jpeg";
import CircularProgress from "@mui/joy/CircularProgress";

const useStyles = makeStyles((theme) => ({
  points: {
    width: "40px",
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

const TeacherProfile = (user) => {
  const paperStyle = {
    backgroundColor: "#FDF5E6",
    top: "4em",
    padding: "5%",
    width: "90%",
    margin: "3% auto",
    position: "relative",
    textAlign: "center",
  };
  const paperStyleX = {
    backgroundColor: "#FDF5E6",
    padding: "2%",
    width: "90%",
    margin: "3% auto",
    position: "relative",
    textAlign: "center",
  };
  const paperStyleThree = {
    backgroundColor: "#FDF5E6",
    padding: "2%",
    width: "60%",
    margin: "3% auto",
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
  const buttonStyle = {
    backgroundColor: "#001f3f",
    color: "white",
    width: "40%",
    margin: "1%",
  };

  const classes = useStyles();
  const [indexofExercise, setIndexofExercise] = useState(0);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [maxPoints, setmaxPoints] = useState("");
  const [correctSolution, setcorrectSolution] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormCloseVisible, setIsFormCloseVisible] = useState(false);
  const [isFormTwoVisible, setIsFormTwoVisible] = useState(false);
  const [isExercises, setisExercises] = useState(false);
  const [WindowShown, setInfoWindowShown] = useState(false);
  const [WindowTwoShown, setInfoWindowTwoShown] = useState(false);
  const [infoMessage, setMessage] = useState(false);
  const [firstOption, setFirstOption] = useState(null);
  const [secondOption, setSecondOption] = useState(null);
  const [thirdOption, setThirdOption] = useState(null);
  const [fourthOption, setFourthOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [teacher, setTeacher] = useState(null);

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
  const clearData = () => {
    setName("");
    setContent("");
    setmaxPoints("");
    setIntroduction("");
    setcorrectSolution("");
    setFirstOption("");
    setSecondOption("");
    setThirdOption("");
    setFourthOption("");
    setCorrectAnswer("");
  };
  const closeFormTwo = () => {
    clearData();
    setIsFormTwoVisible(false);
  };
  const closeForm = () => {
    setIsFormVisible(false);
    console.log(correctSolution);
  };
  const closeFormClose = () => {
    setIsFormCloseVisible(false);
    console.log(correctSolution);
  };
  const showForm = () => {
    classInfo.setmessage(true);
    closeFormTwo();
    setIsFormCloseVisible(false);
    setIsFormVisible(true);
  }; 
  const showFormClose = () => {
    classInfo.setmessage(true);
    closeFormTwo();
    setIsFormVisible(false);
    setIsFormCloseVisible(true);
  };
  const showFormTwo = async (e) => {
    await closeFormTwo();
    classInfo.setmessage(true);
    setIsFormVisible(false);
    setIsFormCloseVisible(false);
    setIndexofExercise(e.target.value);
    console.log(e.target.value);
    const found = exercises[e.target.value];
    setContent(found.content);
    setName(found.name);
    setIntroduction(found.introduction);
      setCorrectAnswer(found.correctAnswer);
      setFirstOption(found.firstOption);
      setSecondOption(found.secondOption);
      setThirdOption(found.thirdOption);
    setcorrectSolution(found.correctSolution);
    setmaxPoints(found.maxPoints);
    setIsFormTwoVisible(true);
  };

 

  const deleteExercise = (e) => {
    const url = "http://localhost:8080/exercise/programming" + e.target.value;
    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }).then(() => {
      window.location.reload();
    });
  };

  const editExercise = (e) => {
    const exercise = {
      name,
      introduction,
      content,
      teacher,
      maxPoints,
      correctSolution,
    };
    const url = "http://localhost:8080/exercise/programming";

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
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
    setMessage("Zmieniono zadanie.");
    setInfoWindowShown(true);
    setTimeout(() => {
      setInfoWindowShown(false);
    }, 3000);
  };
  const addExercise = (e) => {
    e.preventDefault();
    if (isNaN(parseInt(maxPoints))) {
      setInfoWindowShown(true);
      setMessage("Wprowadzono złe dane.");
      setTimeout(() => {
        setInfoWindowShown(false);
      }, 3000);
      return;
    }
    const exercise = {
      name,
      introduction,
      content,
      maxPoints,
      correctSolution,
      teacher,
    };

    const url = "http://localhost:8080/exercise/programming";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    }).then((res) => {
      if (!res.ok) {
        setInfoWindowShown(true);
        setMessage("Niepoprawny kod pythona");
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3000);
        return;
      } else {
        window.location.reload();
        closeForm();
        setName("");
        setContent("");
        setmaxPoints("");
        setcorrectSolution("");
      }
    });
  };
  const addCloseExercise = (e) => {
    e.preventDefault();
    if (isNaN(parseInt(maxPoints))) {
      setInfoWindowShown(true);
      setMessage("Wprowadzono złe dane.");
      setTimeout(() => {
        setInfoWindowShown(false);
      }, 3000);
      return;
    }
    const exercise = {
      name,
      introduction,
      content,
      maxPoints,
      firstOption,
      secondOption,
      thirdOption,
      fourthOption,
      correctAnswer,
    };

    const url = "http://localhost:8080/exercise/abc";
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    }).then((res) => {
      if (!res.ok) {
        setInfoWindowShown(true);
        setMessage("Nie udało się dodać zadania");
        setTimeout(() => {
          setInfoWindowShown(false);
        }, 3000);
        return;
      } else {
        window.location.reload();
        closeFormClose();
      }
    });
  };
  useEffect(() => {
    setTeacher(user.user);
    fetch("http://localhost:8080/user/exercises", {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setExercises(result);
        if (result.length !== 0) setisExercises(true);
        console.log(result);
      });
  }, []);
  useEffect(() => {
   
  }, [indexofExercise]);
  if (!teacher) {
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
          justifyContent: "space-between",
          alignItems: "flex-start",
          padding: "10%",
        }}
      >
        {!teacher && (
          <Paper style={paperStyle}>
            <CircularProgress />
          </Paper>
        )}

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
                <Paper elevation={3}>
                  <img
                    src={teacherlogo}
                    alt="Logo"
                    style={{
                      height: "50%",
                      width: "50%",
                      verticalAlign: "middle",
                      marginRight: "10px",
                    }}
                  />
                </Paper>
              </div>
            </div>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                style={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={showForm}
              >
                Dodaj zadanie otwarte
              </Button>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                style={buttonStyle}
                variant="contained"
                color="secondary"
                onClick={showFormClose}
              >
                Dodaj zadanie zamknięte
              </Button>
            </Box>
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
              <h3>Jako nauczyciel możesz dodawać zadania:</h3>
              <h4>Na zadanie składa się:</h4>

              <li>
                {" "}
                Wstęp teoretyczny informujący, jakich zagadnień teoretycznych ma
                dotyczyć zadanie (zarówno teoria samego języka programowania jak
                i teoria z zagadnień algorytmicznych), który ma pomóc w
                rozwiązaniu.
              </li>
              <li>Treść zadania, która informuje, co należy zrobić </li>
              <li>Twoja propozycja rozwiązania</li>
              <li>Maksymalną ilość punktów do zdobycia za dane zadanie</li>
            </Font>
          </Paper>
        </div>
      </div>

      <div>
        {(isFormVisible || isFormCloseVisible) && (
          <Paper elevation={1} style={paperStyleThree}>
            <h3>Dodaj zadanie</h3>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Nazwa"
                variant="outlined"
                fullWidth
                value={name}
                sx={{ backgroundColor: "white" }}
                onChange={(e) => setName(e.target.value)}
              />

              <Textarea
                id="outlined-basic"
                minRows={2}
                label="Wstęp teoretyczny"
                placeholder="Wstęp teoretyczny"
                fullWidth
                variant="outlined"
                value={introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />
              <Textarea
                id="outlined-basic"
                minRows={2}
                label="Treść"
                placeholder="Treść"
                variant="outlined"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
             {(isFormVisible)&& <Textarea
                sx={{ backgroundColor: "black", color: "white" }}
                minRows={2}
                id="outlined-basic"
                label="Poprawne rozwiązanie"
                placeholder="Poprawne rozwiązanie"
                variant="outlined"
                fullWidth
                value={correctSolution}
                onChange={(e) => setcorrectSolution(e.target.value)}
                onKeyDown={handleKeyDown}
              />}
              {

                (isFormCloseVisible)&&(<div>
                  <Textarea
                minRows={2}
                id="outlined-basic"
                label="Odpowiedź a"
                placeholder="Odpowiedź a"
                variant="outlined"
                fullWidth
                value={firstOption}
                onChange={(e) => setFirstOption(e.target.value)}
              />
              <Textarea
                minRows={2}
                id="outlined-basic"
                label="Odpowiedź b"
                placeholder="Odpowiedź b"
                variant="outlined"
                fullWidth
                value={secondOption}
                onChange={(e) => setSecondOption(e.target.value)}
              />
              <Textarea
                minRows={2}
                id="outlined-basic"
                label="Odpowiedź c"
                placeholder="Odpowiedź c"
                variant="outlined"
                fullWidth
                value={thirdOption}
                onChange={(e) => setThirdOption(e.target.value)}
              />
              <Textarea
                minRows={2}
                id="outlined-basic"
                label="Odpowiedź d (opcjonalna)"
                placeholder="Odpowiedź d (opcjonalna)"
                variant="outlined"
                fullWidth
                value={fourthOption}
                onChange={(e) => setFourthOption(e.target.value)}
              />
              <TextField
                sx={{ backgroundColor: "white" }}
                id="outlined-basic"
                label="poprawna odpowiedź"
                variant="outlined"
                fullWidth
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              />


                </div>)
              }
              <TextField
                id="outlined-basic"
                sx={{ backgroundColor: "white" }}
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Box display="flex" flexDirection="column" gap={2}>
                  {WindowShown && <Toast message={infoMessage} />}
                </Box>
              </div>
            </form>
          </Paper>
        )}

        
        {isExercises && (
          <Paper elevation={1} style={paperStyleX}>
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
                    flexDirection: "row",
                  }}
                >
                  <h3>{exercise.name}</h3>
                  <p>{exercise.content}</p>
                  <p>Ilość rozwiązań:</p>
                  <Box className={classes.points}>{exercise.quantity}</Box>
                  <p>Najczęściej osiągany wynik:</p>
                  <Box className={classes.points}>
                    {exercise.score}/{exercise.maxPoints}
                  </Box>
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
                        value={exercise.id}
                        color="inherit"
                        onClick={deleteExercise}
                      >
                        Usuń
                      </Button>

                      <Button
                        style={buttonStyle}
                        variant="contained"
                        value={index}
                        color="inherit"
                        onClick={showFormTwo}
                      >
                        Edytuj
                      </Button>
                    </div>
                  </div>
                </div>
              </Paper>
            ))}
          </Paper>
        )}
      </div>

      {isFormTwoVisible  && (
        <Container>
          <Paper elevation={1} style={paperStyleX}>
            <form className={classes.root} noValidate autoComplete="off">
              <h3>Edytuj zadanie</h3>
              <TextField
                id="outlined-basic"
                label="Nazwa"
                fullWidth
                variant="outlined"
                sx={{ backgroundColor: "white" }}
                defaultValue={exercises[indexofExercise].name}
                onChange={(e) => setName(e.target.value)}
              />

              <Textarea
                id="outlined-basic"
                label="Wstęp teoretyczny"
                variant="outlined"
                placeholder="Wstęp teoretyczny"
                fullWidth
                
                defaultValue={exercises[indexofExercise].introduction}
                onChange={(e) => setIntroduction(e.target.value)}
              />

              <Textarea
             
                id="outlined-basic"
                variant="outlined"
                label="Treść"
                placeholder="Treść"
                fullWidth
                defaultValue={exercises[indexofExercise].content}
                onChange={(e) => setContent(e.target.value)}
              />
              {exercises[indexofExercise].correctSolution && (
                <Textarea
                
                  minRows={2}
                  id="outlined-basic"
                  label="Poprawne rozwiązanie"
                  placeholder="Poprawne rozwiązanie"
                  variant="outlined"
                  fullWidth
                  defaultValue={exercises[indexofExercise].correctSolution}
                  onChange={(e) => setcorrectSolution(e.target.value)}
                />
              )}
              {exercises[indexofExercise].firstOption && (
                <Textarea
               
                  minRows={2}
                  id="outlined-basic"
                  label="Odpowiedź A"
                  placeholder="Odpowiedź A"
                  variant="outlined"
                  fullWidth
                  defaultValue={exercises[indexofExercise].firstOption}
                  onChange={(e) => setFirstOption(e.target.value)}
                />
              )}
              {exercises[indexofExercise].secondOption && (
                <Textarea
               
                  minRows={2}
                  id="outlined-basic"
                  label="Odpowiedź B"
                  fullWidth
                  defaultValue={exercises[indexofExercise].secondOption}
                  onChange={(e) => setSecondOption(e.target.value)}
                />
              )}
              {exercises[indexofExercise].thirdOption && (
                <Textarea
                
                  minRows={2}
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  defaultValue={exercises[indexofExercise].thirdOption}
                  onChange={(e) => setThirdOption(e.target.value)}
                />
              )}
              {exercises[indexofExercise].fourthOption && (
                <Textarea
                
                  minRows={2}
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  defaultValue={exercises[indexofExercise].fourthOption}
                  onChange={(e) => setFourthOption(e.target.value)}
                />
              )}
              {exercises[indexofExercise].correctAnswer && (
                <Textarea
                 
                  minRows={2}
                  id="outlined-basic"
                  variant="outlined"
                  fullWidth
                  defaultValue={exercises[indexofExercise].correctAnswer}
                  onChange={(e) => setCorrectAnswer(e.target.value)}
                />
              )}
              <TextField
                id="outlined-basic"
                label="max ilość punktów"
                variant="outlined"
                fullWidth
                sx={{ backgroundColor: "white" }}
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
                <Box display="flex" flexDirection="column" gap={2}>
                  {WindowShown && <Toast message={infoMessage} />}
                </Box>
              </div>
            </form>
          </Paper>
        </Container>
      )}
    </div>
  );
};

export default TeacherProfile;
