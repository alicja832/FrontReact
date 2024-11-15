import { Paper } from "@mui/material";
import Typography from "@mui/material/Typography";
import Font from "react-font";

const Footer = () => {

  const paperStyle = { 
    width: "100%",
    height: "200px",
    backgroundColor: "#001f3f",
    color: "white",
    textAlign: "center",
   
  };
return (
  <div style={{
    width: "100%",
    height: "10%",
    
  }}>
   <Paper style = {paperStyle} >
  
    <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            <Font family="tahoma">
              <img
                src={"/logo.svg"}
                alt="Logo"
                style={{
                  height: "24px",
                  verticalAlign: "middle",
                  marginRight: "10px",
                }}
              />
              Nauka Pythona
            </Font>
          </Typography>
   </Paper>
    </div>
)
}
export default Footer;
