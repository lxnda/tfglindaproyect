import React, { useState } from "react";
import { LoginValidate } from "../../utils/validateForms";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { useNotification } from "../../context/notification.context";
import {
  Box,
  Button,
  Grid,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

type LoginType = {
  email: string;
  contrasena: string;
};

type Idtype = {
  idEmp: number;
};

type Validatetype = {
  validate: boolean;
};

const URLApi = "http://127.0.0.1:6001/getUser";
const URLApivalidate = "http://127.0.0.1:6001/verificarUser";

export const LoginPage: React.FC<{}> = () => {
  const { getError, getSuccess } = useNotification();
  const [loginData, setLoginData] = useState<LoginType>({
    email: "",
    contrasena: "",
  });
  const [errors, setErrors] = useState<Validatetype>({
    validate: false,
  });

  const handlechange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(loginData);
  };

  //obtener idempresa
  const [idEmp, setIdEmp] = useState<Idtype>({
    idEmp: 0,
  });

  const peticionesPost = async () => {
    try {
      const response = await axios.post(URLApi, { email: loginData.email });
      setIdEmp(response.data.id);
      if (response.data.id !== 0) {
        localStorage.setItem("idEmpresa", response.data.id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(() => {
        peticionesPost();
      })
      .catch((error) => {
        setErrors({ validate: true });
        getError(error.message);
      });
  };

  //verificar el usuario
  const navigate = useNavigate();

  const verificarPost = async () => {
    try {
      const response = await axios.post(URLApivalidate, loginData);
      if (response.data) {
        navigate("/home");
        getSuccess(JSON.stringify("validado"));
      } else {
        navigate("/");
        getError("Usuario no Validado");
      }
    } catch (error) {
      console.error(error);
    }
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
        <Paper
          sx={{
            padding: "1.2em",
            borderRadius: "0.5em",
            border: "2px solid #FDFFC1",
            boxShadow: "0 0 8px #FDFFC1",
            transition: "border-color 0.3s, box-shadow 0.3s",
            "&:hover": {
              borderColor: "#C6FFC1",
              boxShadow: "0 0 15px #C6FFC1",
            },
          }}
        >
          <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
            Iniciar sesión
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              margin="normal"
              fullWidth
              label="Email"
              type="text"
              sx={{
                mt: 1.5,
                mb: 1.5,
                "&:hover": {
                  borderColor: "#C6FFC1",
                  boxShadow: "0 0 8px #C6FFC1",
                },
              }}
              onChange={handlechange}
              error={errors.validate}
            />
            <TextField
              name="contrasena"
              margin="normal"
              fullWidth
              type="password"
              label="Contraseña"
              sx={{
                mt: 1.5,
                mb: 1.5,
                "&:hover": {
                  borderColor: "#C6FFC1",
                  boxShadow: "0 0 8px #C6FFC1",
                },
              }}
              onChange={handlechange}
              error={errors.validate}
            />
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              sx={{
                mt: 1.5,
                mb: 3,
              }}
              onClick={() => verificarPost()}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/register">
                  <Link variant="body2">¿No tienes una cuenta? Regístrate</Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
