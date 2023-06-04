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
    height: "90vh",
    events: events,
    eventColor: "#C4CE9D", // Color de los eventos sin especificar color individualmente
    eventTextColor: "white", // Color del texto de los eventos
    eventBorderColor: "black", // Color del borde de los eventos
  };

  // Estilos personalizados CSS
  const customStyles = `
    .fc-button-primary {
      background-color: #C4CE9D !important;
      border-color: #C6FFC1!important;
    }
  `;

  return (
    <Container>
      <style>{customStyles}</style>
      <Fullcalendar {...calendarOptions} />
    </Container>
  );
};
