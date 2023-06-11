import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { Box, Typography } from "@material-ui/core";
import {
  Button,
  Divider,
  Grid,
  Paper,
  TextField,
  Tooltip,
} from "@mui/material";
import axios from "axios";

interface FormInfoProps {
  onClose: () => void;
}
interface FormData {
  direccion: string;
  email: string;
  id: number;
  id_usuario: number;
  nombre: string;
  telefono: string;
}
const URLApi = "http://127.0.0.1:6001/getEmpresa";
const idEmpresa = localStorage.getItem("idEmpresa")!;
const id_empresa = parseInt(idEmpresa);

export const Infouser: React.FC<FormInfoProps> = ({ onClose }) => {
  const [data, setData] = useState<FormData>({} as FormData);
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

  console.log(data);
  useEffect(() => {
    peticionesGet();
  }, []);

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
              variant="h6"
              align="center"
              style={{ color: "#C6FFC1", paddingBottom: "2em" }}
            >
              Informacion Usuario
            </Typography>

            <Box sx={{ mb: "1em" }}>
              <Typography>
                <strong>Nombre Usuario:</strong> {data.nombre}
              </Typography>
              <Divider sx={{ my: "0.5em" }} />
              <Typography>
                <strong>Email:</strong> {data.email}
              </Typography>
              <Divider sx={{ my: "0.5em" }} />
              <Typography>
                <strong>Dirección:</strong> {data.direccion}
              </Typography>
              <Divider sx={{ my: "0.5em" }} />
              <Typography>
                <strong>Teléfono:</strong> {data.telefono}
              </Typography>
            </Box>
          </Paper>
        </div>
      </Grid>
    </Grid>
  );
};
