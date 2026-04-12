import useAuth from "@/context/useAuth";
import type { NavElement } from "@/types/navbar";
import { NavLink } from "react-router-dom";

const navLinkClasses = "hover:underline font-semibold capitalize";

const NavItem = ({ link }: { link: NavElement }) => {
  const { isLoggedIn, isPending } = useAuth();

  const visible =
    link.access === "public" ||
    (link.access === "auth" && isLoggedIn()) ||
    (link.access === "guest" && !isLoggedIn());

  if (!visible) {
    return null;
  }

  if (isPending) {
    return null;
  }

  return (
    <li>
      <NavLink
        className={({ isActive }) =>
          isActive ? `${navLinkClasses} underline` : navLinkClasses
        }
        to={link.href}
      >
        {link.label}
      </NavLink>
    </li>
  );
};

export default NavItem;
