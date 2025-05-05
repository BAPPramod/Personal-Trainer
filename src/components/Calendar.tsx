import { Calendar as BigCalendar, momentLocalizer, Views, View } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { fetchTrainings } from "../TrainingAPI";
import Box from "@mui/material/Box";
import { CalendarEvent, TrainingWithCustomer } from "../types";

// Initialize the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

// Helper function to map training data to calendar events
const mapTrainingsToEvents = (trainings: TrainingWithCustomer[]): CalendarEvent[] => {
    return trainings.map((training) => ({
        title: `${training.activity} - ${training.customerData.firstname} ${training.customerData.lastname}`,
        start: new Date(training.date),
        end: new Date(new Date(training.date).getTime() + parseInt(training.duration) * 60000),
    }));
};

export default function Calendar() {
    const [events, setEvents] = useState<CalendarEvent[]>([]);
    const [currentView, setCurrentView] = useState<View>(Views.MONTH);
    const [currentDate, setCurrentDate] = useState(new Date());

    // Fetch training data and map it to calendar events
    useEffect(() => {
        fetchTrainings().then((trainings: TrainingWithCustomer[]) => {
            setEvents(mapTrainingsToEvents(trainings));
        });
    }, []);

    return (
        <Box sx={{ width: "100%", marginTop: 10 }}>
            <BigCalendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                view={currentView}
                onView={setCurrentView}
                defaultView={Views.MONTH}
                date={currentDate}
                onNavigate={setCurrentDate}
            />
        </Box>
    );
}
