import useAuth from "@/context/useAuth";
import { useNavigate } from "react-router-dom";
import DarkMode from "./DarkMode";
import HamNav from "./HamNav";
import Logo from "./Logo";
import NavList from "./NavList";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleAction = (action?: string) => {
    if (action === "logout") {
      logout();
      navigate("/");
    } else if (action === "profile") {
      console.log("navigating to profile");
      navigate(`/users/${user?.username}`);
      navigate(0); // force refresh
    }
  };

  return (
    <nav className="sticky top-0 w-full text-xl z-50 mx-auto container">
      <div className="backdrop-blur-xl py-2">
        <div className="flex justify-between items-center">
          <Logo />
          <NavList onAction={handleAction} />
          <div className="flex items-center gap-2 max-sm:ml-auto ml-2">
            <SearchBar />
            <DarkMode />
          </div>
          <HamNav onAction={handleAction} />
        </div>
      </div>
      <div className="border-b-2 border-foreground dark:border-white bottom-0 relative" />
    </nav>
  );
};

export default Navbar;
