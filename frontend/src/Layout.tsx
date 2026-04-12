import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import { SearchProvider } from "./context/SearchProvider";

const Layout = () => {
  return (
    <SearchProvider>
      <main className="mx-auto container">
        <Navbar />
        <div className="">
          <Outlet />
        </div>
      </main>
    </SearchProvider>
  );
};

export default Layout;
