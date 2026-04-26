import useAuth from "@/context/useAuth";
import type { NavElement } from "@/types/navbar";
import { NavLink } from "react-router-dom";

const navLinkClasses =
  "hover:underline font-semibold capitalize tracking-tighter";

const NavItem = ({
  link,
  onAction,
}: {
  link: NavElement;
  onAction: (a: string | undefined) => void;
}) => {
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
          isActive && link.href ? `${navLinkClasses} underline` : navLinkClasses
        }
        to={link.href ?? "/"}
        onClick={() => onAction(link.action)}
        state={{ from: location.pathname }}
      >
        {link.label}
      </NavLink>
    </li>
  );
};

export default NavItem;
