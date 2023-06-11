import { Route, Routes, Navigate } from "react-router-dom";
import React from "react";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Calendar } from "./pages/calendar";
import { Clientes } from "./pages/clientes";
import { Mudanzas } from "./pages/mudanzas";
import Dashboard from "./components/Dashboard/Dashboard";
import Menuhome from "./pages/home/home";
import { Facturas } from "./pages/factura/factura";
import NotFound from "./pages/notFound/notfound";

export const AppRouter: React.FC<{}> = () => {
  function isAuthenticatedUser() {
    return localStorage.getItem("authenticated") === "true";
  }

  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/clientes"
        element={
          isAuthenticatedUser() ? (
            <Dashboard content={<Clientes />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/calendario"
        element={
          isAuthenticatedUser() ? (
            <Dashboard content={<Calendar />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/mudanzas"
        element={
          isAuthenticatedUser() ? (
            <Dashboard content={<Mudanzas />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/home"
        element={
          isAuthenticatedUser() ? (
            <Dashboard content={<Menuhome />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route
        path="/facturas"
        element={
          isAuthenticatedUser() ? (
            <Dashboard content={<Facturas />} />
          ) : (
            <Navigate to="/" />
          )
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
