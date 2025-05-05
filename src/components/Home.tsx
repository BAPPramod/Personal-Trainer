import React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";

import FaceTwoToneIcon from '@mui/icons-material/FaceTwoTone';
import FitnessCenterTwoToneIcon from '@mui/icons-material/FitnessCenterTwoTone';
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import BarChartTwoToneIcon from '@mui/icons-material/BarChartTwoTone';


const Home: React.FC = () => {
    const cardItems = [
        { title: "Customers", icon: <FaceTwoToneIcon fontSize="large" />, path: "/customer" },
        { title: "Trainings", icon: <FitnessCenterTwoToneIcon fontSize="large" />, path: "/training" },
        { title: "Calendar", icon: <CalendarMonthIcon fontSize="large" />, path: "/calendar" },
        { title: "Statistics", icon: <BarChartTwoToneIcon fontSize="large" />, path: "/statistics" },
    ];

    return (
        <Box sx={{ mt: 10 }}>
            <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, textAlign: "center", color: "#333" }}>
                Welcome to Personal Trainer
            </Typography>
            <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
                {cardItems.map(({ title, icon, path }) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={title}>
                        <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
                            <CardActionArea component={Link} to={path}>
                                <CardContent sx={{ textAlign: "center", py: 4 }}>
                                    {icon}
                                    <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
                                        {title}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default Home;
