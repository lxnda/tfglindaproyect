import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import { LoginPage } from "./pages/login";
import { RegisterPage } from "./pages/register";
import { Calendar }  from "./pages/calendar";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/calendar" element={<Calendar />} />
    </Routes>
  );
};
