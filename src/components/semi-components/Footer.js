import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
// import Font from "react-font";
import { Link } from "react-router-dom";
const Footer = () => {
  const paperStyle = {
    width: "100%",
    fontSize: "5px",
    backgroundColor: "#001f3f",
    color: "white",
    textAlign: "center",
  };
  return (
    <div
      style={{
        width: "100%",  
        height: "40%",
        fontSize: "5px",
      }}
    >
      <Paper style={paperStyle}>
        <Typography
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          
            <img
              src={"/logo.svg"}
              alt="Logo"
              style={{
                height: "24px",
                verticalAlign: "middle",
                marginRight: "10px",
              }}
            />
            Copyright © 2024 Nauka Pythona
         
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px"}}
          >
            <li  >
              <Link style={{color:"white"}} to={"/profil"}>Profil</Link>
            </li>
            <li>
              <Link style={{color:"white"}} to={"/tasks"}>Zadania</Link>
            </li>
            <li>
              <Link style={{color:"white"}}  to={"/"}>Główna</Link>
            </li>
            <li>
              <Link style={{color:"white"}}  to={"/ranking"}>Ranking</Link>
            </li>
            <li>
              <Link style={{color:"white"}}  to={"/logout"}>Wyloguj</Link>
            </li>
          </div>
        </Typography>
      </Paper>
    </div>
  );
};
export default Footer;
