import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import { RouterLayout } from "./common/RouterLayout";
import { LoginPage } from "./pages/login";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};