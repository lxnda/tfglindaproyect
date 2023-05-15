import React from "react";
import { useNotification } from "../../context/notification.context";
import { RouterLayout } from "../../common/RouterLayout";
import { Box } from "@mui/material";
import { HeaderComponent } from "../../components";
import Menuhome from "../menu/home";

export const HomeDashboard: React.FC<{}> = () => {
  const { getError } = useNotification();
  const handleClick = () => {
    getError("hola error");
  };
  return (
    <>
      <Box component="main" sx={{ flexGrow: 1,p:2.5,overflow: 'hidden' }}>
        <HeaderComponent title="Mudanzas Proximas" />
        <Menuhome></Menuhome>
      </Box> 
    </>
  );
};
export default HomeDashboard;