import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout";
import About from "./pages/About";
import Landing from "./pages/Landing";

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
        path: "about",
        element: <About />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
