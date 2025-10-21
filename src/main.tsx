import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import "./index.css";
import Root from "./Root";
import Home from "./Home";
import AuthLayout from "./components/layouts/AuthLayout";
import Login from "./components/pages/auth/Login";
import Register from "./components/pages/auth/Register";
import Stories from "./components/pages/stories/Stories";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        path: "admin",
        Component: Home,
        children: [
          {
            index: true,
            Component: Stories,
          },
        ],
      },
      {
        path: "auth",
        Component: AuthLayout,
        children: [
          { path: "login", Component: Login },
          { path: "register", Component: Register },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
