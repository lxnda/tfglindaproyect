import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@mui/material";

export const Calendar: React.FC = () => {
    return(
        <Container>
           <Fullcalendar
                plugins= {[dayGridPlugin,timeGridPlugin,interactionPlugin]}
                initialView = {"dayGridMonth"}
                headerToolbar ={{
                    start:"today prev, next",
                    center:"title",
                    end:"dayGridMonth, timeGridWeek, timeGridDay"
                }}
                height= {"90vh"}
            /> 
        </Container>
        
    );
}
