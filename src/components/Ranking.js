import React from "react";
import { useEffect, useState } from "react";
import {  Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Font from "react-font";
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
    position: "relative",
  },
  headerContainer: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
    position: "relative",
  },
});
export default function Ranking() {
  const [persons, setPersons] = useState([]);
  const [isPersons, setisPersons] = useState(false);
  const classes = useStyles();

  const paperStyle = {
    padding: "3% 3%",
    width: "70%",
    margin: "1% auto",
    gap: "1%",
    position: "absolute",
    backgroundColor: "#FDF5E6",
    top: "40%",
    left: "15%",
    borderRadius: "10px",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };

  useEffect(() => {
    fetch("http://localhost:8080/user/ranking", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setPersons(result);
        if (result.length !== 0) setisPersons(true);
      })
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  return (
    <div
           
    style={{
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    }}
  >
       <div style={{ flex: 8, display: "flex", flexDirection: "column"  }}>
        {isPersons && (
          <Paper elevation={3} style={paperStyle}>
            <Font family="sans-serif">
              <h2>
                Ranking osób korzystających z aplikacji z najlepszymi wynikami:
              </h2>
            </Font>
            {persons.map((person, index) => (
              <Paper
                elevation={6}
                style={{ margin: "10px", padding: "15px", textAlign: "left" }}
                key={person.id}
              >
                <div
                  className={classes.headerContainer}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                    <h3>{index+1}.{person.name}</h3>
                   <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginLeft: "auto",
                      }}
                    >
                      <p>Osiągnięty wynik:</p>
                    </div>
                    <Box className={classes.points}>
                      {person.score}
                    </Box>
                   
                  </div>

                


              </Paper>
            ))}
          </Paper>
        )}
      </div>
      <div style={{flex: 2, display: "flex", flexDirection: "column" }}>
      <Footer />
      </div>
    </div>
  );
}
