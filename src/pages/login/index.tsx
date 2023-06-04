import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/validateForms";
import { BrowserRouter, NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactPlayer from "react-player";
import zIndex from "@mui/material/styles/zIndex";
import "./Player.css";

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
  const [loginData, setLoginData] = React.useState<LoginType>({
    email: "",
    contrasena: "",
  });

  const handlechange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(loginData);
  };

  //obtener idempresa
  const [idEmp, setIdEmp] = React.useState<Idtype>({
    idEmp: 0,
  });

  const peticionesPost = async () => {
    await axios
      .post(URLApi, { email: loginData.email })
      .then((response) => {
        setIdEmp(response.data.id);
        if (response.data.id != 0) {
          localStorage.setItem("idEmpresa", response.data.id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(() => {
        peticionesPost();
      })
      .catch((error) => {
        getError(error.message);
      });
  };

  //verificar el usuario
  const navigate = useNavigate();

  const verificarPost = async () => {
    await axios
      .post(URLApivalidate, loginData)
      .then((response) => {
        if (response.data) {
          navigate("/home");
          getSuccess(JSON.stringify("validado"));
        } else {
          navigate("/");
          getError("Usuario no Validado");
        }
      })
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
        <Paper sx={{ padding: "1.2em", borderRadius: "0.5em" }}>
          <Typography sx={{ mt: 1, mb: 1 }} variant="h4">
            Iniciar sesion
          </Typography>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              name="email"
              margin="normal"
              fullWidth
              label="Email"
              type="text"
              sx={{ mt: 2, mb: 1.5 }}
              onChange={handlechange}
            />
            <TextField
              name="contrasena"
              margin="normal"
              fullWidth
              type="password"
              label="Password"
              sx={{ mt: 1.5, mb: 1.5 }}
              onChange={handlechange}
            />
            <Button
              fullWidth
              variant="outlined"
              type="submit"
              sx={{ mt: 1.5, mb: 3 }}
              onClick={() => verificarPost()}
            >
              Iniciar sesion
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <NavLink to="/register">
                  <Link variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
