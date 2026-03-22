import DarkMode from "./DarkMode";
import HamNav from "./HamNav";
import Logo from "./Logo";
import NavList from "./NavList";
import SearchToggle from "./SearchToggle";

const Navbar = () => {
  return (
    <nav className="sticky top-0 w-full text-xl z-50 mx-auto container">
      <div className="backdrop-blur-xl py-2">
        <div className="flex justify-between items-center">
          <Logo />
          <NavList />
          <div className="flex items-center gap-2 max-sm:ml-auto ml-2">
            <SearchToggle />
            <DarkMode />
          </div>
          <HamNav />
        </div>
      </div>
      <div className="border-b-2 border-foreground dark:border-white bottom-0 relative" />
    </nav>
  );
};

export default Navbar;
