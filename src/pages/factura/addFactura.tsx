import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import { Button, Grid, Paper, TextField, Tooltip } from "@mui/material";
import axios from "axios";

interface FormAddFacturaProps {
  onClose: () => void;
  idEmp:number;
  setdata:Dispatch<SetStateAction<never[]>>;  
  data: never[];
}

const URLApi = "http://127.0.0.1:6001/addInvoice";

export const FormAddFactura: React.FC<FormAddFacturaProps> = ({ onClose, idEmp, setdata, data}) => {
  const [modalInsert, setModaInsert] = useState({
    fecha: "",
    total: "",
    nombrecliente: "",
    idempresa: idEmp//el id ya esta predefinido
  });

  //coger los datos
  const handlechange=(e: { target: { name: any; value: any; }; })=>{
    const {name,value}=e.target;
    setModaInsert(prevState=>({
      ...prevState,
      [name]:value
    }));
    console.log(modalInsert);
  }

  //enviar los datos 
  const peticionesPost = async () => {
    await axios.post(URLApi, modalInsert)
      .then(response=>(
        setdata(data.concat(response.data))
        
      ))
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
              Añadir Cliente
            </Typography>

            <Box component="form">
              <TextField
                name="nombrecliente"
                margin="normal"
                label="Nombre Cliente"
                fullWidth
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
              />
              <TextField
                name="fecha"
                margin="normal"
                label="Fecha"
                fullWidth
                type="date"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
              />
              <TextField
                name="total"
                margin="normal"
                label="Total"
                fullWidth
                type="number"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
              />
              <Button
              onClick={()=> peticionesPost()}
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Añadir Factura
              </Button>
            </Box>
          </Paper>
        </div>
      </Grid>
    </Grid>
  )
};