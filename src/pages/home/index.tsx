import React from "react";
import { useNotification } from "../../context/notification.context";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../components";
import Sidebar from "../../components/Sidebar";

export const HomePage: React.FC<{}> = () => {
  const { getError } = useNotification();
  const handleClick = () => {
    getError("hola error");
  };
  return (
    <Container maxWidth="xl">
      <HeaderComponent
        title="about moving"
        description="Bienvenido a mi pag"
        element={<Button>Hola mundo</Button>} 

      />
      <Sidebar/>
    </Container>
  );
};
export default HomePage;
