import { Paper } from "@mui/material";
import React from "react";

function ExampleConsole()
{
    const paper = {
        width: "60%",
        margin: "1% auto",
        height: "50%",
        position: "relative",
        backgroundColor: "#000",
        textAlign: "left",
        padding: "1%",
      };
    return  (<Paper elevation={3} style={paper}>
    <span style={{ color: "#6495ed" }}>def </span>
    <span style={{ color: "#FFF59D" }}>fun</span>
    <span style={{ color: "#FFD600" }}>()</span>
    <span style={{ color: "white" }}>:</span>

    <br />
    <span style={{ color: "#FFF59D", paddingLeft: "6%" }}>print</span>
    <span style={{ color: "#FFD600" }}>(</span>
    <span style={{ color: "orange" }}>"Hello world"</span>
    <span style={{ color: "#FFD600" }}>)</span>
    <br />
    <span style={{ color: "#6495ed" }}>class </span>
    <span style={{ color: "#32cd32" }}>Wektor:</span>
    <br />
    <span style={{ color: "#6495ed", paddingLeft: "6%" }}>def </span>
    <span style={{ color: "#FFF59D" }}>__init__</span>
    <span style={{ color: "#FFD600" }}>(</span>
    <span style={{ color: "#87cefa" }}>self,x,y</span>
    <span style={{ color: "#FFD600" }}>):</span>

    <br />
    <span style={{ color: "#6495ed", paddingLeft: "12%" }}>self</span>
    <span style={{ color: "white" }}>.x=x</span>
    <br />
    <span style={{ color: "#6495ed", paddingLeft: "12%" }}>self</span>
    <span style={{ color: "white" }}>.y=y</span>
    <br />
    <span style={{ color: "white" }}>fun</span>
    <span style={{ color: "#FFD600" }}>()</span>
    <br />
    <span style={{ color: "white" }}>wektor = Wektor</span>
    <span style={{ color: "#FFD600" }}>(</span>
    <span style={{ color: "#FFF59D" }}>1,2</span>
    <span style={{ color: "#FFD600" }}>)</span>
  </Paper>);
}
export default ExampleConsole;