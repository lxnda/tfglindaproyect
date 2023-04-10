import React from "react";
import { useNotification } from "../../context/notification.context";
import { Button, Container } from "@mui/material";

export const HomePage: React.FC<{}> = () => {
  const {getError} = useNotification();
  const handleClick = () => {
    getError("hola error");
  };
  return (
    <Container sx={{ mt: 9 }} maxWidth="xl">
      <Button  onClick={handleClick} fullWidth variant="contained">
        estamos en home
      </Button>
    </Container>
  );
};
export default HomePage;
