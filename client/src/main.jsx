import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AppProvider } from "./Context/Context.jsx";
import { DataProvider } from "./Context/DataContext.jsx";
import { PropertyProvider } from "./Context/PropertyContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <PropertyProvider>
      <DataProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </DataProvider>
    </PropertyProvider>
  </StrictMode>
);
