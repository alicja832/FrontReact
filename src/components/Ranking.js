import React from "react";
import { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Footer from "./semi-components/Footer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
    paddingLeft: "15%",
    paddingRight: "15%",
    backgroundColor: "#FDF5E6",
    marginTop: "10%",
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
      <div style={{ flex: 8, display: "flex", flexDirection: "column" }}>
        <div
          className={classes.mainContainer}
          style={{
            display: "flex"
          }}
        >
          {isPersons && (
            <Paper elevation={3} style={paperStyle}>
              <h2>
                Ranking osób korzystających z aplikacji z najlepszymi wynikami:
              </h2>
              <Table sx={{ fontSize: "30px" }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Student</TableCell>
                    <TableCell align="right">Liczba punktów</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow
                      key={person.name}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                          fontSize: "20px",
                        },
                      }}
                    >
                      <TableCell component="th" scope="row">
                        {person.name}
                      </TableCell>
                      <TableCell align="right">{person.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
      </div>
      <div style={{ flex: 2, display: "flex", flexDirection: "column" }}>
        <Footer />
      </div>
    </div>
  );
}
