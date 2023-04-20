import React from "react";
import { useNotification } from "../../context/notification.context";
import { Button, Container } from "@mui/material";
import { HeaderComponent } from "../../components";
import { RouterLayout } from "../../common/RouterLayout";
import Content from "../../components/Content";

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
          description="Gestiona tu empresa de mudanzas"
          element={<Content/>}
        />
      </Container>
    </>
  );
};
export default HomePage;
