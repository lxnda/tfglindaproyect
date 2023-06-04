import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Calendar }  from "./pages/calendar";
import { Clientes } from "./pages/clientes";
import { Mudanzas } from "./pages/mudanzas";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/calendar" element={<Calendar />} />
      <Route path="/clientes" element={<Clientes/>} />
      <Route path="/mudanzas" element={<Mudanzas/>} />
    </Routes>
  );
};
