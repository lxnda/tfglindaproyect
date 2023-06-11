import React, { useEffect, useState } from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { Container } from "@mui/material";
import axios from "axios";

const URLApi = "http://127.0.0.1:6001/getEvents";
const idEmpresa = localStorage.getItem('idEmpresa')!;
const id_empresa = parseInt(idEmpresa);

type DataType = {
  nombre: string;
  fecha: string;
};

export const Calendar: React.FC = () => {
  //traer los datos con get
  const [data, setData] = useState<DataType[]>([]); 
  const peticionesGet = async () => {
    await axios
      .get(URLApi, {
        params: {
          id_empresa: id_empresa,
        },
      })
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

   console.log(data)
  useEffect(() => {
    peticionesGet();
  }, []);

  const formattedEvents = data.map((data) => ({
    title: data.nombre,
    start: data.fecha, 
  }));

  

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
    events: formattedEvents,
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
