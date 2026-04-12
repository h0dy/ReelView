import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Toaster } from "sonner";
import Loader from "./components/global/Loader";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import MoviePage from "./pages/MoviePage";
import SearchMoviesPage from "./pages/MovieSearchPage";
import LogIn from "./pages/SignUp";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: <LogIn />,
      },
      {
        path: "movies/:id",
        element: (
          <Suspense fallback={<Loader page={true} />}>
            <MoviePage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: <SearchMoviesPage />,
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position="top-center" />
    </QueryClientProvider>
  );
}

export default App;
