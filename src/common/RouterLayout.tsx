import { Outlet } from "react-router-dom";
import React from "react";
import { Menu } from "../pages/menu";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  );
};
