import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./login/Login";
import { PublicRoutes } from "./routes/PublicRoutes";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { AddPostPage } from "./pages/xss/AddPostPage";
import { PostsPage } from "./pages/xss/PostsPage";
import { Provider } from "react-redux";
import { store } from "./store";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RootLayout from "./RootLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      // שלב 1: ה-Layout הראשי עוטף את הכל
      element: <RootLayout />,
      children: [
        {
          element: <PublicRoutes />,
          children: [{ path: "/login", element: <Login /> }],
        },
        {
          element: <ProtectedRoutes />,
          children: [
            { path: "/", element: <PostsPage /> },
            { path: "/add-post", element: <AddPostPage /> },
          ],
        },
      ],
    },
  ]);

  const queryClient = new QueryClient();

  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* שלב 2: מחקנו את ה-Header מכאן כי הוא עכשיו בתוך הראוטר */}
          <RouterProvider router={router} />
        </QueryClientProvider>
      </Provider>
    </>
  );
};

export default App;
