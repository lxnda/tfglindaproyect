import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@mui/material";

export const Calendar: React.FC = () => {
  // Arreglo de eventos
  const events = [
    {
      title: "Evento 1",
      start: "2023-06-01",
    },
    {
      title: "Evento 2",
      start: "2023-06-05",
    },
    // Agrega más eventos según sea necesario
  ];

  // Opciones de personalización del calendario
  const calendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: "dayGridMonth",
    headerToolbar: {
      start: "today prev, next",
      center: "title",
      end: "dayGridMonth, timeGridWeek, timeGridDay",
    },
    height: "auto",
    events: events,
    eventColor: "#C6FFC1", // Color de los eventos sin especificar color individualmente
    eventTextColor: "black", // Color del texto de los eventos
    eventBorderColor: "black", // Color del borde de los eventos
  };

  // Estilos personalizados CSS
  const customStyles = `

    :root {
      --fc-daygrid-event-dot-width: 5px;
    }
    
    .fc-col-header-cell-cushion{
      color: black!important;
    }
    .fc-button-primary {
      background-color: #C6FFC1 !important;
      border-color: #C6FFC1!important;
      color: black!important;
    }
    .fc-toolbar-title {
      color: #C6FFC1 !important;
    }
    .fc-daygrid-day {
      color: #C6FFC1 !important;
    }

    .fc-daygrid-day-number {
      color: #C6FFC1 !important;
    }

    .fc-daygrid-day-top {
      border-color: #C6FFC1 !important;
    }
    .fc-daygrid-weekday {
      color: #C6FFC1 !important;
    }
  `;

  return (
    <Container sx={{ flexGrow: 1, overflow: "hidden", paddingTop: "45px" }}>
      <style>{customStyles}</style>
      <Fullcalendar {...calendarOptions} />
    </Container>
  );
};
