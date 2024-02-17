import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SchedulePage from "./components/SchedulePage.jsx";
import HomePage from "./components/HomePage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {path:"/",
      element:<HomePage/>
    },
      {
      path: "schedule",
      element: <SchedulePage/>
    }]
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
