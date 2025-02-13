import React from "react";
import {getToken} from "./api/TokenService"
import { Paper, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ExampleConsole from "./semi-components/ExampleConsole";
import Footer from "./semi-components/Footer";

export default function Home() {
  const paperStyle = {
    padding: "3% 3%",
    width: "70%",
    position: "absolute",
    backgroundColor: "#FDF5E6",
    top: "40%",
    left: "15%",
    borderRadius: "10px",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };
  const paperStyleB = {
    padding: "3% 3%",
    width: "34%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    borderRadius: "10px",
    alignItems: "center",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };
  const paperStyleC = {
    padding: "3% 3%",
    width: "65%",
    marginLeft: "1%",
    position: "relative",
    backgroundColor: "#FDF5E6",
    borderRadius: "10px",
    alignItems: "center",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };

  return (
    <div sx={{display:"flex"}}>
      <div>
        <Paper elevation={2} style={paperStyle}>
          
          <h1>Lekcje podstaw algorytmiki w języku Python</h1>
         
            <p>
              Jako nauczyciel możesz dodawać zadania wraz z opisem teoretycznym,
              jako uczeń możesz je rozwiązywać.
              <br />
              Możesz nauczyć się języka poprzez praktykę!
            </p>
        
          <Button
            component={Link}
            to={"/register"}
            variant="contained"
            style={{ backgroundColor: "#001f3f" }}
          >
            Rozpocznij naukę
          </Button>
        </Paper>

        <div className="right-container">
          <Paper elevation={2} style={paperStyleB}>
              <h1>Walka o Szczyt: Zbieraj Punkty i Rywalizuj z Innymi!</h1>
              <p>
                Wyzwania kodowania są doskonałą okazją do rozwijania swoich
                umiejętności programistycznych oraz pogłębiania wiedzy
                algorytmicznej. Za każdą ukończoną zagadkę zdobywasz punkty,
                które pozwalają Ci wspinać się na szczyt rankingu. Rywalizuj z
                innymi uczniami, porównuj swoje osiągnięcia i udowodnij, że to
                Ty jesteś najlepszy. Pokaż, na co Cię stać, i sprawdź, jak
                wypadasz w tej pasjonującej grze o kodowanie!
              </p>
           { (getToken())&&<Button
              component={Link}
              to={"/ranking"}
              variant="contained"
              style={{ backgroundColor: "#001f3f" }}
            >
              Zobacz ranking
            </Button>
          }
          </Paper>
          <Paper elevation={2} style={paperStyleC}>
            <ExampleConsole />
              <h1> Zdobądź wiedzę i rozwiązuj zadania z łatwością! </h1>
              <p>
                Każde zadanie w aplikacji zaczyna się od wprowadzenia
                teoretycznego, które pozwoli Ci zgłębić istotne aspekty języka
                programowania oraz zagagdnień algorytmicznych. Dodatkowo,
                znajdziesz praktyczne wskazówki, które pomogą Ci skutecznie
                rozwiązać zadanie. Poznaj teorię, wykorzystaj nasze wskazówki i
                rozwijaj swoje umiejętności programistyczne w sposób efektywny i
                inspirujący!
              </p>
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
        <div className="footer-container">
      <Footer/>
      </div>
      </div>
    </div>
  );
}
