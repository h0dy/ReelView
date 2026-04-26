import { navLinks } from "@/utils/links";
import NavItem from "./NavItem";

const NavList = ({
  onAction,
}: {
  onAction: (a: string | undefined) => void;
}) => {
  return (
    <ul className="sm:flex justify-evenly gap-x-5 hidden ml-auto">
      {navLinks.map((link) => {
        return <NavItem onAction={onAction} key={link.label} link={link} />;
      })}
    </ul>
  );
};

export default NavList;
