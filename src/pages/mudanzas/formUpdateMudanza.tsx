import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import { Button, Grid, Paper, TextField, Tooltip } from "@mui/material";
import axios from "axios";

interface FormUpdateMudanzaProps {
  onClose: () => void;
  setdata: Dispatch<SetStateAction<never[]>>;
  data: never[];
  id: number;
  fecha: string;
  direccion_origen: string;
  direccion_destino: string;
  descripcion: string;
  tipo: string;
  total_mudanza: number;
  id_cliente: number;
}

const URLApi = "http://127.0.0.1:6001/updateMudanza";

export const FormUpdateMudanza: React.FC<FormUpdateMudanzaProps> = ({
  onClose,
  setdata,
  data,
  id,
  fecha,
  direccion_origen,
  direccion_destino,
  descripcion,
  tipo,
  total_mudanza,
  id_cliente,
}) => {
  const [modalUpdate, setModaUpdate] = useState({
    id: id,
    fecha: fecha,
    direccion_origen: direccion_origen,
    direccion_destino: direccion_destino,
    descripcion: descripcion,
    tipo: tipo,
    total_mudanza: total_mudanza,
    id_cliente: id_cliente,
  });

  //coger los datos
  const handlechange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setModaUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  console.log(modalUpdate);

  //enviar los datos
  const peticionesPut = async () => {
    await axios
      .put(URLApi, modalUpdate)
      .then()
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
      sx={{ minHeight: "120vh" }}
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
              Editar Mudanza
            </Typography>

            <Box component="form">
              <TextField
                name="fecha"
                margin="normal"
                label="Fecha"
                fullWidth
                type="date"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.fecha}
              />
              <TextField
                name="direccion_origen"
                margin="normal"
                label="Direccion Origen"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.direccion_origen}
              />
              <TextField
                name="direccion_destino"
                margin="normal"
                label="Direccion Destino"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.direccion_destino}
              />
              <TextField
                name="descripcion"
                margin="normal"
                label="Descripcion de Mudanza"
                fullWidth
                type="string"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.descripcion}
              />
              <TextField
                name="tipo"
                margin="normal"
                label="Tipo de Mudanza"
                fullWidth
                type="string"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.tipo}
              />
              <TextField
                name="total_mudanza"
                margin="normal"
                label="Total Mudanza"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.total_mudanza}
              />
              <TextField
                name="id_cliente"
                margin="normal"
                label="ID Cliente"
                fullWidth
                type="number"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.id_cliente}
              />
              <Button
                onClick={() => peticionesPut()}
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Editar Mudanza
              </Button>
            </Box>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};
