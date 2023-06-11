import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import { Button, Grid, Paper, TextField, Tooltip } from "@mui/material";
import axios from "axios";

interface FormAddMudanzaProps {
  onClose: () => void;
  idEmp: number;
  setdata: Dispatch<SetStateAction<never[]>>;
  data: never[];
}

const URLApi = "http://127.0.0.1:6001/addMudanza";

export const FormAddMudanza: React.FC<FormAddMudanzaProps> = ({
  onClose,
  setdata,
  data,
}) => {
  const [modalInsert, setModaInsert] = useState({
    fecha: "",
    direccion_origen: "",
    direccion_destino: "",
    tipo: "",
    total_mudanza: "",
    descripcion: "",
    id_cliente: 0,
  });

  //coger los datos
  const handlechange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setModaInsert((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(modalInsert);
  };

  //enviar los datos
  const peticionesPost = async () => {
    await axios
      .post(URLApi, modalInsert)
      .then((response) => setdata(data.concat(response.data)))
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
    >
      <Grid item>
        <div
          style={{
            position: "relative",
            width: "50vh",
          }}
        >
          <Tooltip title="Cerrar">
            <Button
              onClick={onClose}
              style={{
                position: "absolute",
                top: 23,
                right: 37,
                transform: "translate(50%, -50%)",
                color: "#C6FFC1",
              }}
            >
              <CloseIcon />
            </Button>
          </Tooltip>
          <Paper
            sx={{
              padding: "2em",
              borderRadius: "0.5em",
              width: "50vh",
              backgroundColor: "rgba(31, 38, 30, 0.9)",
              border: "2px solid #2D392C",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              style={{ color: "#C6FFC1" }}
            >
              Añadir Mudanza
            </Typography>
            <Box
              style={{
                maxHeight: "calc(100vh - 200px)", // Ajusta la altura máxima según tus necesidades
                overflowY: "auto",
              }}
            >
              <Box component="form">
                <TextField
                  name="fecha"
                  margin="normal"
                  label="Fecha"
                  fullWidth
                  type="date"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="direccion_origen"
                  margin="normal"
                  label="Direccion Origen"
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="direccion_destino"
                  margin="normal"
                  label="Direccion Destino"
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="tipo"
                  margin="normal"
                  label="Tipo de Mudanza"
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="descripcion"
                  margin="normal"
                  label="Decripcion de Mudanza"
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="id_cliente"
                  margin="normal"
                  label="ID del Cliente"
                  fullWidth
                  type="text"
                  sx={{ mt: 2, mb: 1 }}
                  onChange={handlechange}
                />
                <TextField
                  name="total_mudanza"
                  margin="normal"
                  label="Total Mudanza"
                  fullWidth
                  type="number"
                  sx={{ mt: 2, mb: 1.5 }}
                  onChange={handlechange}
                />
                <Button
                  onClick={() => peticionesPost()}
                  fullWidth
                  variant="outlined"
                  type="submit"
                  sx={{ mt: 1.5, mb: 3 }}
                >
                  Añadir Mudanza
                </Button>
              </Box>
            </Box>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};
