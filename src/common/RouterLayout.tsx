import { Outlet } from "react-router-dom";
import React from "react";
import { Menu } from "../pages/menu";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
    {/* MUESTRA EL MENU CON EL DASHBOARD */}
      <Menu />
      <Outlet />
    </>
  );
};
