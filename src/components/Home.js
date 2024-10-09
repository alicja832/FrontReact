import React from "react";
import {  useState } from "react";
import { Container, Paper, Button, Box } from "@mui/material";
import MyParticles from "./MyParticles";
import { Link } from "react-router-dom";
import Font from "react-font";

export default function Home() {
  const [init, setInit] = useState(false);

  const paperStyle = {
    padding: "3% 3%",
    width: "70%",
    margin: "1% auto",
    gap: "1%",
    position: "absolute",
    backgroundColor: "#FDF5E6",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)", 
    borderRadius: "10px" ,
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };

  const paperStyleTwo = {
    padding: "3% 3%",
    width: "34%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    borderRadius: "10px" ,
    alignItems: "center",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };
  const paperStyleThree = {
    padding: "3% 3%",
    width: "64%",
    margin: "1%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    borderRadius: "10px",
    alignItems: "center",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };
  return (
    <div>
      <MyParticles></MyParticles>
   
      <div id="sthelse">
        <Container>
          <Paper elevation={3} style={paperStyle}>
             <Font family="tahoma">
             
            </Font> 
            <h1>Lekcje podstaw algorytmiki w języku Python</h1>
            <Font family="sans-serif"> 
              <p>
                Jako nauczyciel możesz dodawać zadania wraz z opisem
                teoretycznym, jako uczeń możesz je rozwiązywać.
                <br />
                Możesz nauczyć się języka poprzez praktykę!
              </p>
            </Font> 

            <Button
              component={Link}
              to={"/register"}
              variant="contained"
              style={{ backgroundColor: "#001f3f" }}
            >
              Rozpocznij naukę
            </Button>
          </Paper>
        </Container>
      </div>
      <div class="right-container">
        <Paper elevation={3} style={paperStyleTwo}>
         <Font family="tahoma"> 
            <h1>Walka o Szczyt: Zbieraj Punkty i Rywalizuj z Innymi!</h1>
           </Font> 
           <Font family="sans-serif"> 
            <p>
              Wyzwania kodowania są doskonałą okazją do rozwijania swoich
              umiejętności programistycznych oraz pogłębiania wiedzy
              algorytmicznej. Za każdą ukończoną zagadkę zdobywasz punkty, które
              pozwalają Ci wspinać się na szczyt rankingu. Rywalizuj z innymi
              uczniami, porównuj swoje osiągnięcia i udowodnij, że to Ty jesteś
              najlepszy. Pokaż, na co Cię stać, i sprawdź, jak wypadasz w tej
              pasjonującej grze o kodowanie!
            </p>
        </Font> 
          <Button
            component={Link}
            to={"/ranking"}
            variant="contained"
            style={{ backgroundColor: "#001f3f" }}
          >
            Zobacz ranking
          </Button>
        </Paper>
        <Paper elevation={3} style={paperStyleThree}>
           <Font family="tahoma"> 
            <h1> Zdobądź wiedzę i rozwiązuj zadania z łatwością! </h1>
           </Font> 
          <Font family="sans-serif">
            <p>
              Każde zadanie w aplikacji zaczyna się od wprowadzenia
              teoretycznego, które pozwoli Ci zgłębić istotne aspekty języka
              programowania. Dodatkowo, znajdziesz praktyczne wskazówki, które
              pomogą Ci skutecznie rozwiązać zadanie. Poznaj teorię, wykorzystaj
              nasze wskazówki i rozwijaj swoje umiejętności programistyczne w
              sposób efektywny i inspirujący!
            </p>
           </Font> 
          <Button
            component={Link}
            to={"/tasks"}
            variant="contained"
            style={{ backgroundColor: "#001f3f" }}
          >
            Zobacz zadania
          </Button>
        </Paper>
      </div>
    </div>
  );
}
