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

const useStyles = makeStyles({});
export default function Ranking() {
  
  const [persons, setPersons] = useState([]);
  const [isPersons, setisPersons] = useState(false);
  const classes = useStyles();

  const paperStyle = {
    padding: "1% 1%",
    width: "70%",
    margin: "1% auto",
    gap: "1%",
    paddingLeft: "12%",
    paddingRight: "12%",
    backgroundColor: "#FDF5E6",
    marginTop: "10%",
    left: "15%",
    borderRadius: "10px",
    textAlign: "center",
    textShadow: "1px 1px 2px black",
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/user/ranking`, {
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
    <div className="main-container">
      <div className="first-container">
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
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: "28px" }}>Uczeń</TableCell>
                    <TableCell sx={{ fontSize: "28px" }} align="right">Liczba punktów</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {persons.map((person) => (
                    <TableRow
                      key={person.name}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0
                        },
                      }}
                    >
                      <TableCell  sx={{ fontSize: "20px" }} component="th" scope="row">
                        {person.name}
                      </TableCell>
                      <TableCell sx={{ fontSize: "20px" }} align="right">{person.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Paper>
          )}
        </div>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
  );
}
