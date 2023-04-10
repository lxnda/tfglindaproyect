import { Route, Routes } from "react-router-dom";
import React from "react";
import HomePage from "./pages/home";
import LoginPage from "./pages/login";
import { RouterLayout } from "./common/RouterLayout";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/" element={<RouterLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Route>
    </Routes>
  );
};
