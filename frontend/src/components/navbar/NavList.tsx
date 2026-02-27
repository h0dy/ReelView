import { navLinks } from "@/utils/links";
import NavItem from "./NavItem";

const NavList = () => {
  return (
    <ul className="sm:flex justify-evenly gap-x-4 hidden ml-auto">
      {navLinks.map((link) => {
        return <NavItem key={link.href} href={link.href} label={link.label} />;
      })}
    </ul>
  );
};

export default NavList;
