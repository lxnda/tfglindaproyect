import { Route, Routes } from "react-router-dom";
import React from "react";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Calendar }  from "./pages/calendar";
import { Clientes } from "./pages/clientes";
import { Mudanzas } from "./pages/mudanzas";
import Dashboard from "./components/Dashboard/Dashboard";
import Menuhome from "./pages/home/home";
import Facturas from "./pages/factura/factura";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/clientes" element={<Dashboard content={<Clientes />} />} />
      <Route path="/calendario" element={<Dashboard content={<Calendar />} />} />
      <Route path="/mudanzas" element={<Dashboard content={<Mudanzas />} />} />
      <Route path="/home" element={<Dashboard content={<Menuhome />} />} />
      <Route path="/facturas" element={<Dashboard content={<Facturas />} />} />
    </Routes>
  );
};
