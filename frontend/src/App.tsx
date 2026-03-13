import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Loader from "./components/global/Loader";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import MoviePage from "./pages/MoviePage";
import SignUp from "./pages/SignUp";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "movies/:id",
        element: (
          <Suspense fallback={<Loader />}>
            <MoviePage />
          </Suspense>
        ),
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
