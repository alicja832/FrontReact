import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { getToken } from "./api/TokenService";
import AccountBoxIcon from "@mui/icons-material/AccountBox"; //import logo from '/logo.svg';
import Font from "react-font";

export default function DrawerAppBar(register, props) {
  
  const [navItems, setNavItems] = useState([
    "Zadania",
    "Główna",
    "Zaloguj",
    "Zarejestruj",
  ]);

  const [purposes, setPurposes] = useState([
    "/tasks",
    "/",
    "/login",
    "/register",
  ]);

  const profile = "Profil";

  useEffect(() => {
  
    if (getToken() && !navItems.includes(profile)) {
        
        navItems.unshift("Profil");
        navItems.unshift("Ranking");
        purposes.unshift("/profil");
        purposes.unshift("/ranking");
        navItems.push("Wyloguj");
        purposes.push("/logout");

        setNavItems(
          navItems.filter(
            (element) => element !== "Zaloguj" && element !== "Zarejestruj"
          )
      );

      setPurposes(
        purposes.filter(
          (element) => element !== "/login" && element !== "/register"
        )
      );
    }
    
    
  }, [register]);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}></Typography>
      <Divider />
      <List>
        {navItems.map((item, index) => (
          <ListItem key={item} disablePadding>
            <ListItemButton
              component={Link}
              to={purposes[index]}
              sx={{ textAlign: "center" }}
            >
              <Font family="sans-serif">
                <ListItemText primary={item} />
              </Font>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "#001f3f",
          textShadow: "1px 1px 2px white",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item, index) => (
              <Button
                key={item}
                component={Link}
                to={purposes[index]}
                sx={{ color: "#fff", fontSize: "1.075em" }}
              >
                <Font family="sans-serif">{item}</Font>
                {item === profile && <AccountBoxIcon sx={{ margin: "1px" }} />}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: "100%",
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
