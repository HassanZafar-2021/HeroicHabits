import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import ForestFocus from "./pages/ForestFocus.tsx";
import ProgressPage from "./pages/ProgressPage.tsx";
import PeakPerformance from "./pages/PeakPerformance.tsx";
import Login from "./pages/UserLogin.tsx";
import Home from "./pages/Home.tsx"; // Ensure this is defined
import ErrorPage from "./pages/ErrorPage.tsx"; // Ensure this is defined

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main layout component
    errorElement: <ErrorPage />, // Handle errors
    children: [
      {
        index: true,
        element: <Home />, // Home component
      },
      {
        path: "login", // Changed from "/login" to "login"
        element: <Login />,
      },
      {
        path: "progress", // Added missing route
        element: <ProgressPage />,
      },
      {
        path: "forestfocus", // Added missing route
        element: <ForestFocus />,
      },
      {
        path: "peakperformance", // Added missing route
        element: <PeakPerformance />,
      },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
