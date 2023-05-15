import React from "react";
import { useNotification } from "../../context/notification.context";
import { RouterLayout } from "../../common/RouterLayout";

export const Clientes: React.FC<{}> = () => {
  const { getError } = useNotification();
  const handleClick = () => {
    getError("hola error");
  };
  return (
    <>
      <RouterLayout />
    </>
  );
};
export default Clientes;