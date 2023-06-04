import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router";
import React from "react";
import { NotificationProvider } from "./context/notification.context";
import Particle from "./components/Particle";

function App() {
  return (
      <NotificationProvider>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </NotificationProvider>
    
  );
}

export default App;
