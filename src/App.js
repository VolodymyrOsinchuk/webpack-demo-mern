import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import HomeLayout from './pages/HomeLayout'
import ErrorPage from './pages/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomeLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
