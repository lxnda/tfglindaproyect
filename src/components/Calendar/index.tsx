import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const Calendar: React.FC = () => {
    return(
        <div>
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
        </div>
    );
}
export default Calendar;