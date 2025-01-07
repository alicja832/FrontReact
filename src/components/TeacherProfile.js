import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import Textarea from "@mui/joy/Textarea";
import { Container, Paper, Button, Box } from "@mui/material";
import { FormControl } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getToken } from "./api/TokenService";
import { classInfo } from "./semi-components/MyParticles";
import teacherlogo from "../teacher.jpeg";
import CircularProgress from "@mui/joy/CircularProgress";
import Footer from "./semi-components/Footer";

const useStyles = makeStyles(() => ({}));

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
  const paperStyleForm = {
    backgroundColor: "#FDF5E6",
    padding: "2%",
    width: "90%",
    margin: "3% auto",
    position: "relative",
    textAlign: "center",
    spaceBetween: "2%",
  };
  const paperStyleA = {
    backgroundColor: "#FDF5E6",
    padding: "2%",
    width: "60%",
    margin: "3% auto",
    gap: "4%",
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
  const [access, setAccess] = useState(null);
  const [indexofExercise, setIndexofExercise] = useState(0);
  const [correctSolution, setCorrectSolution] = useState("");
  const [priceType, setPriceType] = useState("Fragment poprawnego rozwiązania");
  const [solutionSchema, setSolutionSchema] = useState(null);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [maxPoints, setMaxPoints] = useState("");
  const [introduction, setIntroduction] = useState("");
  const [exercises, setExercises] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isFormCloseVisible, setIsFormCloseVisible] = useState(false);
  const [isFormTwoVisible, setIsFormTwoVisible] = useState(false);
  const [isExercises, setisExercises] = useState(false);
  const [WindowShown, setInfoWindowShown] = useState(false);
  const [infoMessage, setMessage] = useState(false);
  const [firstOption, setFirstOption] = useState(null);
  const [secondOption, setSecondOption] = useState(null);
  const [thirdOption, setThirdOption] = useState(null);
  const [fourthOption, setFourthOption] = useState(null);
  const [correctAnswer, setCorrectAnswer] = useState(null);
  const [clicked, setClicked] = useState(false);
  const [solutionpart, setSolutionPart] = useState("");
  const [teacher, setTeacher] = useState(null);
  const [solutionParts, setSolutionParts] = useState([]);
  const [testingData, settestingData] = useState([]);
  const [points, setPoints] = useState([]);
  const [point, setPoint] = useState(null);
  const [isFormFilled, setIsFormFilled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;

      setSolutionPart(
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

  const handleKeyDownSchema = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setSolutionSchema(
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
  const handleKeyDownSolution = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const { selectionStart, selectionEnd } = e.target;
      setCorrectSolution(
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
    setAccess(null);
    settestingData([]);
    setName("");
    setContent("");
    setSolutionSchema("");
    setCorrectSolution("");
    setMaxPoints("");
    setIntroduction("");
    setFirstOption("");
    setSolutionSchema(null);
    setSecondOption("");
    setThirdOption("");
    setFourthOption("");
    setCorrectAnswer("");
    setSolutionPart("");
    setSolutionParts([]);
    setIsLoading(false);
    setClicked(false);
    setIsFormFilled(false);
    setPriceType("Fragment poprawnego rozwiązania");
    setPoints([]);
    setPoint("");
    setShowButton(true);
  };

  const closeFormTwo = () => {
    clearData();
    setIsFormTwoVisible(false);
  };

  const closeForm = () => {
    clearData();
    setIsFormVisible(false);
  };

  const closeFormClose = () => {
    clearData();
    setIsFormCloseVisible(false);
  };

  const showForm = async () => {
    clearData();
    closeFormTwo();
    setIsFormCloseVisible(false);
    setIsFormVisible(true);
  };

  const showFormClose = () => {
    classInfo.setmessage(true);
    clearData();
    closeFormTwo();
    setIsFormVisible(false);
    setIsFormCloseVisible(true);
  };

  const showFormTwo = async (e) => {
    
    closeFormTwo();
    clearData();
    closeFormTwo();
    classInfo.setmessage(true);
    setIsFormVisible(false);
    setIsFormCloseVisible(false);
    setIndexofExercise(e.target.value);
    const found = exercises[e.target.value];

    try {
      if (found.correctSolution) {
        const url =
          `${process.env.REACT_APP_API_URL}/solution/parts/` + found.id;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        const parts = await response.json();
        await setSolutionParts(parts);
        setPriceType("Fragment poprawnego rozwiązania");
      }
      if (found.solutionSchema) {
        const url =
          `${process.env.REACT_APP_API_URL}/exercise/testdata/` + found.id;
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
            "Content-Type": "application/json",
          },
        });
        const parts = await response.json();

        await settestingData(parts);
        setPriceType("Dane do testowania");
        setPoint("");
      }
    } catch (error) {
      console.log(error);
    }

    setContent(found.content);
    setName(found.name);
    setIntroduction(found.introduction);
    setSolutionSchema(found.solutionSchema);
    setCorrectSolution(found.correctSolution);
    setCorrectAnswer(found.correctAnswer);
    setFirstOption(found.firstOption);
    setSecondOption(found.secondOption);
    setThirdOption(found.thirdOption);
    setAccess(found.access);
    setMaxPoints(found.maxPoints);
    setIsFormTwoVisible(true);
  };

  const deleteExercise = (e) => {
    setIsLoading(true);
    const url = `${process.env.REACT_APP_API_URL}/exercise/` + e.target.value;
    fetch(url, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then(() => {
        setIsLoading(false);
        setInfoWindowShown(true);
        setMessage("Usunięto");
        setTimeout(() => {
          setInfoWindowShown(false);
          getExercises();
        }, 3000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editExercise = (e) => {
    
    let suma = 0;
    points.forEach((element) => {
      suma += element;
    });

    testingData.forEach((element) => {
      suma += element.points;
    });

    solutionParts.forEach((element) => {
      suma += element.points;
    });
    
    if (suma < maxPoints) {
      setClicked(true);
      return;
    }

    const correctSolutions = [];
    const testData = [];
    
    if (solutionSchema) {
      for (let i = 0; i < testingData.length; i++) {
        if (testingData[i].testingData) {
          testData.push(testingData[i].testingData);
          points.push(testingData[i].points);
        } else testData.push(testingData[i]);
      }
      correctSolutions.push(correctSolution);
    } else {
      for (let i = 0; i < maxPoints; i++) {
        if (solutionParts[i].correctSolutionPart)
        {  
          correctSolutions.push(solutionParts[i].correctSolutionPart);
          points.push(solutionParts[i].points);
        }
        else correctSolutions.push(solutionParts[i]);
      }
    }
   
    setIsLoading(true);

    const id = exercises[indexofExercise].id;
   
    const exercise = {
      id,
      access,
      name,
      introduction,
      content,
      teacher,
      maxPoints,
      correctSolutions,
      solutionSchema,
      testData,
      points,
    };

    const url = `${process.env.REACT_APP_API_URL}/exercise/programming`;
    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          setMessage("Zmieniono zadanie");
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          setTimeout(() => {
            closeFormTwo();
            getExercises();
          }, 3000);
        } else {
          setMessage("Nie udało się zmienić zadania");
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editCloseExercise = (e) => {
    setIsLoading(true);
    const id = exercises[indexofExercise].id;
    const exercise = {
      id,
      name,
      introduction,
      content,
      teacher,
      maxPoints,
      firstOption,
      secondOption,
      thirdOption,
      fourthOption,
      correctAnswer,
    };

    const url = `${process.env.REACT_APP_API_URL}/exercise/abc`;

    fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    })
      .then((response) => {
        if (response.ok) {
          setIsLoading(false);
          setMessage("Zmieniono zadanie");
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          setTimeout(() => {
            closeFormTwo();
            getExercises();
          }, 3000);
        } else {
          setIsLoading(false);
          setMessage("Nie udało się zmienić zadania");
          setInfoWindowShown(true);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const showSolutionsField = (e) => {
    if (e.target.value) {
      solutionParts.push(e.target.value);
      if (point) {
        points.push(parseInt(point));
        testingData.push(e.target.value);
        setPoint("");
      }
    }

    let suma = 0;
    points.forEach((element) => {
      suma += element;
    });

    testingData.forEach((element) => {
      suma += element.points ? element.points : 0;
    });

    solutionParts.forEach((element) => {
      suma += element.points ? element.points : 0;
    });

    if (!solutionSchema && suma == maxPoints) {
      setClicked(false);
      setIsFormFilled(true);
      setShowButton(true);
      return;
    }

    if (solutionSchema && suma == maxPoints) {
      setClicked(false);
      setIsFormFilled(true);
      setShowButton(true);
      return;
    }
    setSolutionPart("");
    setPoint("");
    setClicked(true);
  };
  const addExercise = (e) => {
    if (!clicked && !isFormFilled) {
      showSolutionsField(e);
      setShowButton(false);
      return;
    }
    setIsLoading(true);
    setClicked(false);
    if (isNaN(parseInt(maxPoints))) {
      setIsLoading(false);
      setInfoWindowShown(true);
      setMessage("Wprowadzono złe dane.");
      setTimeout(() => {
        setInfoWindowShown(false);
      }, 3000);
      return;
    }
    const correctSolutions = [];
    const testData = [];
    if (correctSolution) {
      for (let i = 0; i < solutionParts.length; i++)
        testData.push(solutionParts[i]);
      correctSolutions.push(correctSolution);
    } else
      for (let i = 0; i < solutionParts.length; i++)
        correctSolutions.push(solutionParts[i]);
    if (!!access) access = false;
    const exercise = {
      name,
      introduction,
      content,
      maxPoints,
      access,
      correctSolutions,
      teacher,
      solutionSchema,
      testData,
      points,
    };
  
    const url = `${process.env.REACT_APP_API_URL}/exercise/programming`;

    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    })
      .then((res) => {
        if (!res.ok) {
          setInfoWindowShown(true);
          setMessage("Nie udało się dodać zadania");
          setIsLoading(false);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          return;
        } else {
          setIsLoading(false);
          setInfoWindowShown(true);
          setMessage("Dodano zadanie");
          setTimeout(() => {
            closeForm();
            setInfoWindowShown(false);
            getExercises();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const getExercises = () => {
    fetch(`${process.env.REACT_APP_API_URL}/user/exercises`, {
      method: "GET",
      headers: { Authorization: `Bearer ${getToken()}` },
    })
      .then((res) => res.json())
      .then((result) => {
        setExercises(result);
        if (result.length !== 0) setisExercises(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addCloseExercise = (e) => {
    setIsLoading(true);
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
      access,
      firstOption,
      secondOption,
      thirdOption,
      fourthOption,
      correctAnswer,
    };

    const url = `${process.env.REACT_APP_API_URL}/exercise/abc`;
    fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(exercise),
    })
      .then((res) => {
        if (!res.ok) {
          setInfoWindowShown(true);
          setMessage("Nie udało się dodać zadania");
          setIsLoading(false);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          return;
        } else {
          setInfoWindowShown(true);
          setMessage("Udało się dodać zadanie");
          setIsLoading(false);
          setTimeout(() => {
            setInfoWindowShown(false);
          }, 3000);
          setTimeout(() => {
            closeFormClose();
            getExercises();
          }, 3000);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setTeacher(user.user);
    getExercises();
  }, [user.user]);
  useEffect(() => {}, [indexofExercise, solutionParts]);

  function Toast({ message }) {
    return <div className="toast">{message}</div>;
  }
  return (
    <div className="main-container">
      <div className="first-container">
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
              <div>{!teacher && <CircularProgress />}</div>
            </Paper>
          )}
          {teacher && (
            <div
              style={{
                display: "flex",
                flexBasis: "60%",
                flexDirection: "column",
              }}
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
                    <h2>Profil nauczyciela</h2>
                    <p>{teacher.name}</p>
                    <p>{teacher.email}</p>
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
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flexBasis: "40%",
            }}
          >
            <Paper elevation={1} style={paperStyleTwo}>
              <h3>Jako nauczyciel możesz dodawać zadania:</h3>
              <h4>Na zadanie otwarte składa się:</h4>
              <li>
                {" "}
                Wstęp teoretyczny informujący, jakich zagadnień teoretycznych ma
                dotyczyć zadanie (teoria z zagadnień algorytmicznych), który ma
                pomóc w rozwiązaniu.
              </li>
              <li>
                Treść zadania, która informuje, co ma robić kod użytkownika{" "}
              </li>
              Masz dwie opcje dodania zadania:
              <li>
                Twoja propozycja rozwiązania podzielona na części, liczba części
                - maksymalna ilość punktów za zadanie
              </li>
              <li>
                Schemat rozwiązania - ramy funkcji przyjmującej odpowiednie
                parametry i zwracającej odpowiednie wartości oraz dane testujące
                - zestaw argumentów wywołania funkcji,każdy zestaw może być
                oceniony na inną liczbę punktów - ważne żeby suma była równa
                maksymalnej liczbie punktów
              </li>
              <li>Maksymalna ilość punktów do zdobycia za dane zadanie</li>
              <h4>Na zadanie zamknięte składa się:</h4>
              <li>
                {" "}
                Wstęp teoretyczny informujący, jakich zagadnień ze składni
                Pythona ma dotyczyć zadanie, który ma pomóc w rozwiązaniu.
              </li>
              <li>Treść zadania </li>
              <li>Trzy lub cztery odpowiedzi do wyboru(A,B,C,D)</li>
              <li>Prawidłowa odpowiedź: A/B/C/D</li>
              <li>Maksymalna ilość punktów do zdobycia za zadanie</li>
            </Paper>
          </div>
        </div>

        {(isFormVisible || isFormCloseVisible) && (
          <Paper elevation={1} style={paperStyleA}>
            <h3>Dodaj zadanie</h3>
            <form
              className={classes.root}
              style={{ gap: "4%" }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Nazwa"
                variant="outlined"
                fullWidth
                value={name}
                sx={{ backgroundColor: "white", marginBottom: "2%" }}
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
                sx={{ marginBottom: "2%" }}
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
                sx={{ marginBottom: "2%" }}
                onChange={(e) => setContent(e.target.value)}
              />
              <TextField
                id="outlined-basic"
                sx={{ backgroundColor: "white", marginBottom: "2%" }}
                label="max ilość punktów"
                variant="outlined"
                fullWidth
                value={maxPoints}
                onChange={(e) => {
                  setMaxPoints(e.target.value);
                }}
              />
              {!isFormCloseVisible && (
                <Textarea
                  minRows={2}
                  label="Ramy rozwiązania dla użytkownika"
                  placeholder="Ramy rozwiązania użytkownika(opcjonalne)"
                  variant="outlined"
                  fullWidth
                  sx={{
                    backgroundColor: "#000",
                    color: "white",
                    marginBottom: "2%",
                  }}
                  value={solutionSchema}
                  onKeyDown={handleKeyDownSchema}
                  onChange={(e) => {
                    setPriceType("Dane do testowania");
                    setSolutionSchema(e.target.value);
                  }}
                />
              )}

              <div>
                {priceType === "Dane do testowania" && (
                  <div>
                    <Textarea
                      minRows={2}
                      label="Poprawne rozwiązanie"
                      placeholder="Poprawne rozwiązanie"
                      variant="outlined"
                      fullWidth
                      sx={{
                        backgroundColor: "#000",
                        color: "white",
                        marginBottom: "2%",
                      }}
                      value={correctSolution}
                      onKeyDown={handleKeyDownSolution}
                      onChange={(e) => {
                        setCorrectSolution(e.target.value);
                      }}
                    />
                  </div>
                )}
                {solutionParts.map((solutionPart, index) => (
                  <div>
                    <Textarea
                      minRows={2}
                      key={index}
                      id={index}
                      label={priceType}
                      placeholder={priceType}
                      variant="outlined"
                      fullWidth
                      sx={{
                        backgroundColor: "#000",
                        color: "white",
                        marginBottom: "2%",
                      }}
                      defaultValue={solutionPart}
                      onChange={(e) => (solutionPart = e.target.value)}
                    />
                    {index < points.length && (
                      <TextField
                        key={index}
                        id="outlined-basic"
                        sx={{ backgroundColor: "white", marginBottom: "2%" }}
                        label="ilość punktów"
                        variant="outlined"
                        fullWidth
                        defaultValue={points[index]}
                      />
                    )}
                  </div>
                ))}
              </div>
              {clicked && !isFormCloseVisible && (
                <Paper elevation={1} style={paperStyleA}>
                  <Textarea
                    minRows={2}
                    id="outlined-basic"
                    label={priceType}
                    placeholder={priceType}
                    sx={{
                      backgroundColor: "#000",
                      color: "white",
                      marginBottom: "2%",
                    }}
                    variant="outlined"
                    fullWidth
                    value={solutionpart}
                    onChange={(e) => setSolutionPart(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  {
                    <TextField
                      id="outlined-basic"
                      sx={{ backgroundColor: "white", marginBottom: "2%" }}
                      label="ilość punktów"
                      variant="outlined"
                      fullWidth
                      value={point}
                      onChange={(e) => {
                        setPoint(e.target.value);
                      }}
                    />
                  }
                  {priceType === "Fragment poprawnego rozwiązania" && (
                    <Button
                      style={buttonStyle}
                      variant="contained"
                      color="secondary"
                      value={solutionpart}
                      onClick={(e) => {
                        showSolutionsField(e);
                      }}
                    >
                      Dodaj kolejny fragment
                    </Button>
                  )}
                  {priceType === "Dane do testowania" && (
                    <Button
                      style={buttonStyle}
                      variant="contained"
                      color="secondary"
                      value={solutionpart}
                      onClick={(e) => {
                        showSolutionsField(e);
                      }}
                    >
                      Dodaj kolejne dane testowe
                    </Button>
                  )}
                </Paper>
              )}

              {isFormCloseVisible && (
                <div>
                  <Textarea
                    minRows={2}
                    id="outlined-basic"
                    label="Odpowiedź a"
                    placeholder="Odpowiedź a"
                    variant="outlined"
                    fullWidth
                    sx={{ marginBottom: "2%" }}
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
                    sx={{ marginBottom: "2%" }}
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
                    sx={{ marginBottom: "2%" }}
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
                    sx={{ marginBottom: "2%" }}
                    value={fourthOption}
                    onChange={(e) => setFourthOption(e.target.value)}
                  />
                  <TextField
                    sx={{ backgroundColor: "white", marginBottom: "2%" }}
                    id="outlined-basic"
                    label="Poprawna odpowiedź (A/B/C/D)"
                    variant="outlined"
                    fullWidth
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  />
                </div>
              )}
              <h4>Ustaw widoczność zadania:</h4>
              <Button
                style={{
                  backgroundColor: access === true ? "#ffd700" : "white",
                  color: "black",
                }}
                onClick={(e) => {
                  setAccess(true);
                }}
              >
                Tylko dla zalogowanych{" "}
              </Button>
              <Button
                style={{
                  backgroundColor: access === false ? "#ffd700" : "white",
                  color: "black",
                }}
                onClick={(e) => {
                  setAccess(false);
                }}
              >
                Dla wszystkich{" "}
              </Button>
              <FormControl fullWidth></FormControl>

              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                {isLoading && <CircularProgress />}
                {!isFormCloseVisible &&
                  !isLoading &&
                  !WindowShown &&
                  showButton && (
                    <Button
                      style={buttonStyle}
                      variant="contained"
                      color="secondary"
                      onClick={addExercise}
                    >
                      Dodaj zadanie
                    </Button>
                  )}
                {isFormCloseVisible && !isLoading && !WindowShown && (
                  <Button
                    style={buttonStyle}
                    variant="contained"
                    color="secondary"
                    onClick={addCloseExercise}
                  >
                    Dodaj zadanie
                  </Button>
                )}
                {WindowShown && <Toast message={infoMessage} />}
              </Box>
            </form>
          </Paper>
        )}
        {isExercises && (
          <Paper elevation={1} style={paperStyleForm}>
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
                <div className="main-row">
                  <div className="header-container">
                    <div className="right-info">
                      <h3>{exercise.name}</h3>
                    </div>
                    <div className="header-container">
                      <p>{exercise.content}</p>
                    </div>
                  </div>
                  <div className="right-info">
                    <p>Ilość rozwiązań:</p>
                    <Box className="points">{exercise.quantity}</Box>
                    <p>Najczęściej osiągany wynik:</p>
                    <Box className="points">
                      {exercise.score}/{exercise.maxPoints}
                    </Box>

                    <div className="button-box">
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

        {isFormTwoVisible && (
          <Container>
            <Paper elevation={1} style={paperStyleForm}>
              <form className={classes.root} noValidate autoComplete="off">
                <h3>Edytuj zadanie</h3>
                <TextField
                  id="outlined-basic"
                  label="Nazwa"
                  sx={{ backgroundColor: "white", marginBottom: "2%" }}
                  fullWidth
                  variant="outlined"
                  defaultValue={exercises[indexofExercise].name}
                  onChange={(e) => setName(e.target.value)}
                />

                <Textarea
                  id="outlined-basic"
                  label="Wstęp teoretyczny"
                  variant="outlined"
                  placeholder="Wstęp teoretyczny"
                  sx={{ marginBottom: "2%" }}
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
                  sx={{ marginBottom: "2%" }}
                  defaultValue={exercises[indexofExercise].content}
                  onChange={(e) => setContent(e.target.value)}
                />

                {exercises[indexofExercise].correctSolution && (
                  <div>
                    {!exercises[indexofExercise].solutionSchema && (
                      <div>
                        {solutionParts.map((solutionPart, index) => (
                          <div>
                            <Textarea
                              minRows={2}
                              id={index}
                              key={index}
                              label="Fragment poprawnego rozwiązania"
                              placeholder="Fragment poprawnego rozwiązania"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: "#000",
                                color: "white",
                                marginBottom: "2%",
                              }}
                              defaultValue={
                                solutionPart.correctSolutionPart
                                  ? solutionPart.correctSolutionPart
                                  : solutionPart
                              }
                              onChange={(e) =>
                                (solutionPart.correctSolutionPart =
                                  e.target.value)
                              }
                            />
                            <TextField
                              id="outlined-basic"
                              label="ilość punktów"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: "white",
                                marginBottom: "2%",
                              }}
                              defaultValue={
                                solutionPart.points
                                  ? solutionPart.points
                                  : points[index - solutionParts.length + 1]
                              }
                              onChange={(e) => {
                                solutionPart.points = e.target.value;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                    {priceType === "Dane do testowania" && (
                      <div>
                        <h5>Poprawne rozwiązanie:</h5>

                        <Textarea
                          minRows={2}
                          label="Poprawne rozwiązanie"
                          placeholder="Poprawne rozwiązanie"
                          variant="outlined"
                          fullWidth
                          sx={{
                            backgroundColor: "#000",
                            color: "white",
                            marginBottom: "2%",
                          }}
                          defaultValue={
                            exercises[indexofExercise].correctSolution
                          }
                          onKeyDown={handleKeyDownSolution}
                          onChange={(e) => {
                            setCorrectSolution(e.target.value);
                          }}
                        />

                        <h5>Schemat rozwiązania:</h5>
                        <Textarea
                          minRows={2}
                          label="Schemat rozwiązania"
                          placeholder="Schemat rozwiązania"
                          variant="outlined"
                          fullWidth
                          sx={{
                            backgroundColor: "#000",
                            color: "white",
                            marginBottom: "2%",
                          }}
                          onKeyDown={handleKeyDownSchema}
                          defaultValue={
                            exercises[indexofExercise].solutionSchema
                          }
                          onChange={(e) => {
                            setSolutionSchema(e.target.value);
                          }}
                        />

                        <h5>Dane testujące:</h5>
                        {testingData.map((test, index) => (
                          <div>
                            <Textarea
                              minRows={2}
                              id={index}
                              key={index}
                              label="Dane testujące"
                              placeholder="Dane testujące"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: "#000",
                                color: "white",
                                marginBottom: "2%",
                              }}
                              defaultValue={
                                test.testingData ? test.testingData : test
                              }
                              onChange={(e) =>
                                (test.testingData = e.target.value)
                              }
                            />
                            <TextField
                              id="outlined-basic"
                              label="ilość punktów"
                              variant="outlined"
                              fullWidth
                              sx={{
                                backgroundColor: "white",
                                marginBottom: "2%",
                              }}
                              defaultValue={
                                test.points
                                  ? test.points
                                  : points[index - testingData.length + 1]
                              }
                              onChange={(e) => {
                                test.points = e.target.value;
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {exercises[indexofExercise].firstOption && (
                  <Textarea
                    minRows={2}
                    id="outlined-basic"
                    label="Odpowiedź A"
                    placeholder="Odpowiedź A"
                    variant="outlined"
                    sx={{ marginBottom: "2%" }}
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
                    sx={{ marginBottom: "2%" }}
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
                    sx={{ marginBottom: "2%" }}
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
                    placeholder="Odpowiedź d(opcjonalna)"
                    sx={{ marginBottom: "2%" }}
                    fullWidth
                    defaultValue={exercises[indexofExercise].fourthOption}
                    onChange={(e) => setFourthOption(e.target.value)}
                  />
                )}
                {exercises[indexofExercise].correctAnswer && (
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Prawidłowa odpowiedź"
                    fullWidth
                    sx={{ backgroundColor: "white", marginBottom: "2%" }}
                    defaultValue={exercises[indexofExercise].correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                  />
                )}
                <TextField
                  id="outlined-basic"
                  label="max ilość punktów"
                  variant="outlined"
                  fullWidth
                  sx={{ backgroundColor: "white", marginBottom: "2%" }}
                  defaultValue={exercises[indexofExercise].maxPoints}
                  onChange={(e) => setMaxPoints(e.target.value)}
                />
                {clicked && !isFormCloseVisible && (
                  <Paper elevation={1} style={paperStyleA}>
                    <Textarea
                      minRows={2}
                      id="outlined-basic"
                      label={priceType}
                      placeholder={priceType}
                      sx={{
                        backgroundColor: "#000",
                        color: "white",
                        marginBottom: "2%",
                      }}
                      variant="outlined"
                      fullWidth
                      value={solutionpart}
                      onChange={(e) => setSolutionPart(e.target.value)}
                      onKeyDown={handleKeyDown}
                    />
                    {
                      <TextField
                        id="outlined-basic"
                        sx={{ backgroundColor: "white", marginBottom: "2%" }}
                        label="ilość punktów"
                        variant="outlined"
                        fullWidth
                        value={point}
                        onChange={(e) => {
                          setPoint(e.target.value);
                        }}
                      />
                    }
                    {priceType === "Fragment poprawnego rozwiązania" && (
                      <Button
                        style={buttonStyle}
                        variant="contained"
                        color="secondary"
                        value={solutionpart}
                        onClick={(e) => {
                          showSolutionsField(e);
                        }}
                      >
                        Dodaj kolejny fragment
                      </Button>
                    )}
                    {priceType === "Dane do testowania" && (
                      <Button
                        style={buttonStyle}
                        variant="contained"
                        color="secondary"
                        value={solutionpart}
                        onClick={(e) => {
                          showSolutionsField(e);
                        }}
                      >
                        Dodaj kolejne dane testowe
                      </Button>
                    )}
                  </Paper>
                )}
                <h4>Ustaw widoczność zadania:</h4>
                <Button
                  style={{
                    backgroundColor: access === true ? "#ffd700" : "white",
                    color: "black",
                  }}
                  onClick={(e) => {
                    setAccess(true);
                  }}
                >
                  Tylko dla zalogowanych{" "}
                </Button>
                <Button
                  style={{
                    backgroundColor: access === false ? "#ffd700" : "white",
                    color: "black",
                  }}
                  onClick={(e) => {
                    setAccess(false);
                  }}
                >
                  Dla wszystkich{" "}
                </Button>
                <FormControl fullWidth></FormControl>
                <div className="info-box">
                  <Box display="flex" flexDirection="column" gap={2}>
                    {isLoading && <CircularProgress />}
                    {exercises[indexofExercise].correctSolution &&
                      !isLoading &&
                      !WindowShown && (
                        <Button
                          style={buttonStyle}
                          variant="contained"
                          color="secondary"
                          value={indexofExercise}
                          onClick={editExercise}
                        >
                          Zmień
                        </Button>
                      )}
                    {exercises[indexofExercise].correctAnswer &&
                      !isLoading &&
                      !WindowShown && (
                        <Button
                          style={buttonStyle}
                          variant="contained"
                          color="secondary"
                          value={indexofExercise}
                          onClick={editCloseExercise}
                        >
                          Zmień
                        </Button>
                      )}
                  </Box>
                </div>
              </form>
              <div className="info-box">
                <Box display="flex" flexDirection="column" gap={2}>
                  <Box display="flex" flexDirection="column" gap={2}>
                    {WindowShown && <Toast message={infoMessage} />}
                  </Box>
                </Box>
              </div>
            </Paper>
          </Container>
        )}
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
};

export default TeacherProfile;
