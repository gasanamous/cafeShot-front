import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import axios from "axios";
import App from "./App.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "flowbite";
axios.defaults.baseURL = import.meta.env.VITE_API;

const theme = createTheme({
  palette: {
    primary: {
      main: "#30261E",
    },
    secondary: {
      main: "#f0e5cf",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);
