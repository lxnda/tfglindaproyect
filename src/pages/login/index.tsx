import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

type LoginType = {
  username: string;
  password: string;
};

export const LoginPage: React.FC<{}> = () => {
  const [loginData, setLoginData] = React.useState<LoginType>({
    username: "",
    password: "",
  });

  const dataLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log(loginData);
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
              Iniciar sesion{" "}
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                name="username"
                margin="normal"
                fullWidth
                label="Email"
                type="text"
                sx={{ mt: 2, mb: 1.5 }}
                required
                onChange={dataLogin}
              />
              <TextField
                name="password"
                margin="normal"
                fullWidth
                type="password"
                label="Password"
                sx={{ mt: 1.5, mb: 1.5 }}
                required
                onChange={dataLogin}
              />
              <Button
                fullWidth
                variant="outlined"
                type="submit"
                sx={{ mt: 1.5, mb: 3 }}
              >
                Iniciar sesion
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
