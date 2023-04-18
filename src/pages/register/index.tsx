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
import { useNavigate } from "react-router-dom";


type LoginType = {
  username: string;
  password: string;
  nameuser: string;
  lastname: string;
};

export const RegisterPage: React.FC<{}> = () => {
  //ruta hacia register
  const navigate = useNavigate();

  const navigateLogin = () => {
    navigate("LoginPage");
  };
  const { getError, getSuccess } = useNotification();
  const [loginData, setLoginData] = React.useState<LoginType>({
    username: "",
    nameuser: "",
    lastname: "",
    password: "",
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    LoginValidate.validate(loginData)
      .then(() => {
        getSuccess(JSON.stringify(loginData));
      })
      .catch((error) => {
        getError(error.message);
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
              {" "}
              Crear Cuenta{" "}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                fullWidth
                label="Email"
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                onChange={dataLogin}
              />
              <Grid container direction="row" justifyContent="space-beetwen">
                <Grid item>
                  <TextField
                    name="nameuser"
                    margin="normal"
                    fullWidth
                    label="Nombre"
                    type="text"
                    sx={{ mt: 2, mb: 1.5 }}
                    onChange={dataLogin}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    name="lastname"
                    margin="normal"
                    fullWidth
                    label="Apellidos"
                    type="text"
                    sx={{ mt: 2, mb: 1.5 }}
                    onChange={dataLogin}
                  />
                </Grid>
              </Grid>

              <TextField
                name="password"
                margin="normal"
                fullWidth
                type="password"
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                onChange={dataLogin}
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
              >
                Crear cuenta
              </Button>
              <Link href="" variant="body2" onClick={navigateLogin}>
                {"have an account? Sign In"}
              </Link>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
