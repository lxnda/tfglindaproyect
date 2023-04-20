import React from "react";
import { useNotification } from "../../context/notification.context";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../components";
import { Menu } from "../menu";
import { RouterLayout } from "../../common/RouterLayout";

export const HomePage: React.FC<{}> = () => {
  const { getError } = useNotification();
  const handleClick = () => {
    getError("hola error");
  };
  return (
    <>
      <RouterLayout />
      <Container maxWidth="xl">
        <HeaderComponent
          title="about moving"
          description="Bienvenido a mi pag"
          element={<Button>Hola mundo</Button>}
        />
      </Container>
    </>
  );
};
export default HomePage;
