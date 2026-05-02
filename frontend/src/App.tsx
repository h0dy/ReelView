import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { Toaster } from "sonner";
import GuestRoute from "./components/auth/GuestRoute";
import Loader from "./components/global/Loader";
import { AuthProvider } from "./context/AuthProvider";
import Layout from "./Layout";
import AboutPage from "./pages/AboutPage";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn";
import MoviePage from "./pages/MoviePage";
import SearchMoviesPage from "./pages/MovieSearchPage";
import TopMoviesPage from "./pages/TopMoviesPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // data fresh for 5 min
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <Layout />
        <ScrollRestoration />
      </AuthProvider>
    ),
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <LogIn />
          </GuestRoute>
        ),
      },
      {
        path: "movies/:id",
        element: <MoviePage />,
      },
      {
        path: "search",
        element: <SearchMoviesPage />,
      },
      {
        path: "about",
        element: <AboutPage />,
      },
      {
        path: "movies/top",
        element: (
          <Suspense fallback={<Loader page={true} />}>
            <TopMoviesPage />
          </Suspense>
        ),
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
