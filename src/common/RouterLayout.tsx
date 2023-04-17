import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import React from "react";

export const RouterLayout: React.FC<{}> = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};
