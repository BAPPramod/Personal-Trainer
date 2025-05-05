import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Drawer,
  CssBaseline,
} from "@mui/material";
import { useState } from "react";
import { HashRouter as Router, Route, Routes, Link } from "react-router-dom";
import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';
import MenuIcon from "@mui/icons-material/Menu";
import Customers from "./components/Customers";
import Trainings from "./components/Trainings";
import Calendar from "./components/Calendar";
import Statistics from "./components/Statistics";

const drawerWidth = 200;

function App() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <List>
      {[
        { text: "Customer", icon: <FaceTwoToneIcon />, path: "/customer" },
        { text: "Training", icon: <FitnessCenterTwoToneIcon />, path: "/training" },
        { text: "Calendar", icon: <CalendarMonthIcon />, path: "/calendar" },
        { text: "Statistics", icon: <BarChartTwoToneIcon />, path: "/statistics" },
      ].map(({ text, icon, path }) => (
        <ListItem key={text} disablePadding>
          <ListItemButton component={Link} to={path}>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText primary={text} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Router>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            backgroundColor: "#00502e",
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            ml: open ? `${drawerWidth}px` : 0,
            transition: "margin 0.3s ease-in-out",
          }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(!open)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1, fontWeight: 600 }}
            >
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        {open && (
          <Drawer
            variant="persistent"
            anchor="left"
            open={open}
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
          >
            <Box sx={{ overflow: "auto" }}>{DrawerList}</Box>
          </Drawer>
        )}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: open ? `calc(100% - ${drawerWidth}px)` : "100%",
            transition: "margin 0.3s ease-in-out",
            ml: 0,
          }}
        >
          <Routes>
            <Route path="/customer" element={<Customers />} />
            <Route path="/training" element={<Trainings />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/statistics" element={<Statistics />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;