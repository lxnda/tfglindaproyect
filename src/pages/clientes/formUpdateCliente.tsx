import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import { Button, Grid, Paper, TextField, Tooltip } from "@mui/material";
import axios from "axios";

interface FormUpdateClienteProps {
  onClose: () => void;
  idEmp: number;
  setdata: Dispatch<SetStateAction<never[]>>;
  data: never[];
  nombre: string;
  direccion: string;
  telefono: number;
  email: string;
  id: number;
}

const URLApi = "http://127.0.0.1:6001/updateClientes";

export const FormUpdateCliente: React.FC<FormUpdateClienteProps> = ({
  onClose,
  idEmp,
  setdata,
  data,
  nombre,
  direccion,
  telefono,
  email,
  id

}) => {
  const [modalUpdate, setModaUpdate] = useState({
    nombre: nombre,
    direccion: direccion,
    telefono: telefono,
    email: email,
    id_empresa: idEmp, //el id ya esta predefinido
    id:id,
  });
  //coger los datos
  const handlechange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setModaUpdate((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(modalUpdate);
  };

  //enviar los datos
  const peticionesPut = async () => {
    await axios
      .put(URLApi, modalUpdate)
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
              Editar Cliente
            </Typography>

            <Box component="form">
              <TextField
                name="nombre"
                margin="normal"
                label="Nombre"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.nombre}
              />
              <TextField
                name="direccion"
                margin="normal"
                label="Direccion"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.direccion}
              />
              <TextField
                name="telefono"
                margin="normal"
                label="Telefono"
                fullWidth
                type="phone"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.telefono}
              />
              <TextField
                name="email"
                margin="normal"
                label="Email"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
                value={modalUpdate.email}
              />
              <Button
                onClick={() => peticionesPut()}
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Editar Cliente
              </Button>
            </Box>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};
