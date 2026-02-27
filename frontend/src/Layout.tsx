import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <main className="mx-auto container">
        <Navbar />
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
