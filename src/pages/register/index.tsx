import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import bgLogin from "../../assets/images/bglogin.jpg";

import { useNotification } from "../../context/notification.context";

type RegisterType = {
  email: string;
  nombre: string;
  direccion: string;
  telefono: string;
  contrasena: string;
};

const URLApi = "http://127.0.0.1:6001/addUser";

export const RegisterPage: React.FC<{}> = () => {
  const navigate = useNavigate();
  const { getError, getSuccess } = useNotification();
  const [registerData, setRegisterData] = useState<RegisterType>({
    email: "",
    nombre: "",
    direccion: "",
    telefono: "",
    contrasena: "",
  });
  const [termsModalOpen, setTermsModalOpen] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!termsAccepted) {
      getError("Debe aceptar los términos de privacidad");
      return;
    }

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length === 0) {
      getSuccess("Usuario validado");
      peticionesPost()
        .then(() => {
          getSuccess("¡Yay! Usuario creado correctamente!");
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          getError(error.message);
        });
    } else {
      const errorMessages = Object.entries(validationErrors).map(
        ([field, message]) => `${field}: ${message}`
      );
      getError(errorMessages.join("\n"));
    }
  };

  const validateForm = () => {
    const validationErrors: Partial<RegisterType> = {};

    // Expresión regular para validar el email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Expresión regular para validar el teléfono (solo números)
    const phoneRegex = /^\d+$/;

    // Expresión regular para validar el nombre de empresa
    const nombreRegex = /^[a-zA-Z0-9\s\-]+$/;

    // Validación para el campo 'email'
    if (!registerData.email) {
      validationErrors.email = "Campo requerido";
    } else if (!emailRegex.test(registerData.email)) {
      validationErrors.email = "Email inválido";
    }

    // Validación para el campo 'nombre'
    if (!registerData.nombre) {
      validationErrors.nombre = "Campo requerido";
    } else if (!nombreRegex.test(registerData.nombre)) {
      validationErrors.nombre = "Nombre de empresa inválido";
    }

    // Validación para el campo 'direccion'
    if (!registerData.direccion) {
      validationErrors.direccion = "Campo requerido";
    }

    // Validación para el campo 'telefono'
    if (!registerData.telefono) {
      validationErrors.telefono = "Campo requerido";
    } else if (!phoneRegex.test(registerData.telefono)) {
      validationErrors.telefono = "Teléfono inválido";
    }

    // Validación para el campo 'contrasena'
    if (!registerData.contrasena) {
      validationErrors.contrasena = "Campo requerido";
    }

    return validationErrors;
  };

  const peticionesPost = async () => {
    try {
      const response = await axios.post(URLApi, registerData);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleTermsModalOpen = () => {
    setTermsModalOpen(true);
  };

  const handleTermsModalClose = () => {
    setTermsModalOpen(false);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTermsAccepted(e.target.checked);
  };

  return (
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh",
        backgroundImage: `url(${bgLogin})`,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.25)", }}
      >
        <Grid item width="90vh">
          <Paper
            sx={{
              padding: "1.2em",
              borderRadius: "0.5em",
              border: "2px solid #C6FFC1",
              boxShadow: "0 0 8px #C6FFC1",
            }}
          >
            <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
              Crear Cuenta
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="email"
                margin="normal"
                fullWidth
                label="Correo"
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={handlechange}
              />
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                sx={{ mb: 1.5 }}
              >
                <Grid item xs={6}>
                  <TextField
                    name="nombre"
                    margin="normal"
                    fullWidth
                    label="Nombre Empresa"
                    type="text"
                    sx={{ mt: 2 }}
                    onChange={handlechange}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    name="direccion"
                    margin="normal"
                    fullWidth
                    label="Dirección"
                    type="text"
                    sx={{ mt: 2 }}
                    onChange={handlechange}
                  />
                </Grid>
              </Grid>
              <TextField
                name="telefono"
                margin="normal"
                fullWidth
                label="Teléfono"
                type="text"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={handlechange}
              />
              <TextField
                name="contrasena"
                margin="normal"
                fullWidth
                type="password"
                label="Contraseña"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={handlechange}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={termsAccepted}
                    onChange={handleCheckboxChange}
                  />
                }
                label={
                  <Typography variant="body2">
                    Aceptas los términos de privacidad{" "}
                    <Link
                      component="button"
                      variant="body2"
                      onClick={handleTermsModalOpen}
                    >
                      (Ver términos)
                    </Link>
                  </Typography>
                }
              />
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Crear cuenta
              </Button>
              <NavLink to="/">
                <Link variant="body2">
                  {"¿Ya tienes una cuenta? Inicia sesión"}
                </Link>
              </NavLink>
            </Box>
          </Paper>
          <Dialog
            open={termsModalOpen}
            onClose={handleTermsModalClose}
            PaperProps={{
              sx: {
                backgroundColor: "#1D211D",
                border: "2px solid #C6FFC1",
                boxShadow: "0 0 8px #C6FFC1",
                opacity: 0.9,
                color: "white",
              },
            }}
          >
            <DialogTitle>Términos de privacidad</DialogTitle>
            <DialogContent>
              <DialogContentText sx={{ color: "white" }}>
                Nuestra prioridad es proteger tu información personal. A
                continuación, se presentan los puntos clave de nuestra política
                de privacidad: <br />
                <br />
                <b>Recopilación de información:</b> Podemos recopilar
                información personal que nos proporcionas al utilizar nuestros
                servicios. <br />
                <br />
                <b>Uso de la información:</b> Utilizamos tu información para
                brindarte nuestros servicios y mejorar tu experiencia como
                usuario. <br />
                <br />
                <b>Protección de la información:</b> Implementamos medidas de
                seguridad para proteger tus datos personales y prevenir su
                acceso no autorizado. <br />
                <br />
                <b>Compartir información:</b> No compartimos tu información
                personal con terceros, excepto cuando sea necesario para
                brindarte nuestros servicios o cumplir con la ley. <br />
                <br />
                <b>Tus derechos:</b> Tienes derecho a acceder, corregir y
                eliminar tus datos personales. Puedes contactarnos para ejercer
                estos derechos. <br />
                <br />
                <b>Cambios en la política:</b> Podemos actualizar nuestra
                política de privacidad. <br />
                <br />
                Te notificaremos sobre cualquier cambio relevante. <br />
                Si tienes alguna pregunta o inquietud sobre nuestra política de
                privacidad, no dudes en contactarnos.
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={handleTermsModalClose}
                sx={{
                  color: "white",
                  backgroundColor: "#798B78",
                  border: "2px solid #798B78",
                }}
              >
                Cerrar
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>
  );
};
