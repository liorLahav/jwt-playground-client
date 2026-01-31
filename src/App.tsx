import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './header/Header'
import Login from './login/Login'

function App() {

  const router = createBrowserRouter([
    {
      element: <PublicRoutes />,
      children: [
        { path: "/login", element: <Login /> },
      ],
    },
    {
      element: <ProtectedRoutes />,
      children: [
        { path: "/", element: <Home /> },
      ],
    },
  ])

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
        <RouterProvider router={router} />
      </main>
    </div>
  )
}

export default App


export const ProtectedRoutes = () => {
  const { isAuthenticated, isLoading } = UseAuth();

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <Outlet />
}

import { Navigate, Outlet } from "react-router-dom"
import Home from './home/Home'
import { UseAuth } from './routes/Auth'

export const PublicRoutes = () => {
  const { isAuthenticated } = UseAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
