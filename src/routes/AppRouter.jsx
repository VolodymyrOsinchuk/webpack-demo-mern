import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";

import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";

import ProtectedRoute from "../components/ProtectedRoute";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },

  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/profile",
        element: <ProfileLayout />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "account",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
