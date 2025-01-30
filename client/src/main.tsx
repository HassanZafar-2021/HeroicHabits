import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

import App from "./App.tsx";
import ForestFocus from "./pages/ForestFocus.tsx";
import ProgressPage from "./pages/ProgressPage.tsx";
import PeakPerformance from "./pages/PeakPerformance.tsx";
import Login from "./pages/UserLogin.tsx";
import Dashboard from "./components/Dashboard.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App should contain <Outlet /> for nested routes to work
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Dashboard userName="JohnDoe" avatarUrl="avatar.png" quests={[]} /> },
      { path: "login", element: <Login /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "forestfocus", element: <ForestFocus /> },
      { path: "peakperformance", element: <PeakPerformance /> },
    ],
  },
]);

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
