import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";

const Layout = () => {
  return (
    <>
      <main className="mx-auto container">
        <Navbar />
        <div className="px-5">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default Layout;
