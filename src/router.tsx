import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import { RouterLayout } from "./common/RouterLayout";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Menu } from "./pages/menu";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};
