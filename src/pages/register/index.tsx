import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { useNotification } from "../../context/notification.context";
import { LoginValidate } from "../../utils/validateForms";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

type LoginType = {
  email: string;
  nombre: string;
  direccion: string;
  telefono: number;
  contrasena: string;
};

const URLApi = "http://127.0.0.1:6001/addUser";

export const RegisterPage: React.FC<{}> = () => {
  const { getError, getSuccess } = useNotification();
  const [loginData, setLoginData] = React.useState<LoginType>({
    email: "",
    nombre: "",
    direccion: "",
    telefono: 0,
    contrasena: "",
  });

  const handlechange=(e: { target: { name: any; value: any; }; })=>{
    const {name,value}=e.target;
    setLoginData(prevState=>({
      ...prevState,
      [name]:value
    }));
    console.log(loginData);
  }

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(() => {
        getSuccess(JSON.stringify("Usuario validado"));
      })
      .catch((error) => {
        getError(error.message);
      });
  };

  //enviar los datos 
  const peticionesPost = async () => {
    await axios.post(URLApi, loginData)
      .then(response=>(
        console.log(response)
      ))
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <Container maxWidth="sm">
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
              <Grid container direction="row" justifyContent="space-beetwen">
                <Grid item>
                  <TextField
                    name="nombre"
                    margin="normal"
                    fullWidth
                    label="Nombre Empresa"
                    type="text"
                    sx={{ mt: 2, mb: 1.5 }}
                    onChange={handlechange}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="direccion"
                    margin="normal"
                    fullWidth
                    label="Direccion"
                    type="text"
                    sx={{ mt: 2, mb: 1.5 }}
                    onChange={handlechange}
                  />
                </Grid>
                
              </Grid>
              <Grid item>
                  <TextField
                    name="telefono"
                    margin="normal"
                    fullWidth
                    label="Telefono"
                    type="phone"
                    sx={{ mt: 2, mb: 1.5 }}
                    onChange={handlechange}
                  />
                </Grid>
              <TextField
                name="contrasena"
                margin="normal"
                fullWidth
                type="password"
                label="Constraseña"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={handlechange}
              />
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label="Aceptas los terminos de privacidad etc.."
                />
              </FormGroup>
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
                onClick={()=> peticionesPost()}
              >
                Crear cuenta
              </Button>
              <NavLink to="/">
                <Link variant="body2">{"have an account? Sign In"}</Link>
              </NavLink>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
