import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Routes/Root";
import Home from "./Pages/Home/Home";
import Menu from "./Pages/Menu/Menu";
import About from "./Pages/About/About";
import LocationContact from "./Pages/LocationContact/LocationContact";
import Order from "./Pages/Order/Order";
import Dashboard from "./Pages/Dashboard/Dashboard";
import CafeTables from "./Pages/CafeTables/CafeTables";
import { ToastContainer } from "react-toastify";
import Login from "./Components/Login/Login";
import { AdminProvider } from "./Contexts/AdminContext";
import { CustomerProvider } from "./Contexts/CustomerContext";
import { WaiterProvider } from "./Contexts/WaiterContext";
import CustomerRoute from "./Routes/CustomerRoute";
import WaiterRoute from "./Routes/WaiterRoute";
import AdminRoute from "./Routes/AdminRoute";
import { SiteSettingsProvider } from "./Contexts/SiteSettingsContext";

function App() {
  const router = createBrowserRouter([
    {
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/Menu",
          element: <Menu />,
          children: [
            {
              path: ":category",
              element: <Menu />,
            },
          ],
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "LocationContact",
          element: <LocationContact />,
        },
        {
          path: "Dashboard",
          element: (
            <AdminRoute>
              <Dashboard />
            </AdminRoute>
          ),
        },
        {
          path: "CafeTables",
          element: (
            <WaiterRoute>
              <CafeTables />
            </WaiterRoute>
          ),
        },
        {
          path: "Order",
          element: (
            <CustomerRoute>
              <Order />
            </CustomerRoute>
          ),
        },
        { path: "login", element: <Login /> },
      ],
    },
  ]);

  return (
    <SiteSettingsProvider>
      <ToastContainer position="bottom-right" />
      <AdminProvider>
        <CustomerProvider>
          <WaiterProvider>
            <RouterProvider router={router} />
          </WaiterProvider>
        </CustomerProvider>
      </AdminProvider>
    </SiteSettingsProvider>
  );
}

export default App;
