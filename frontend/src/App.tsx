import { Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import Landing from "./pages/Landing";
import Movie from "./pages/Movie";
import SignUp from "./pages/SignUp";
import Loader from "./components/global/Loader";

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
            <Movie />
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
