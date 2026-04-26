import useAuth from "@/context/useAuth";
import type { NavElement } from "@/types/navbar";
import { NavLink } from "react-router-dom";

const HamNavItem = ({
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
    <NavLink
      className={({ isActive }) =>
        isActive && link.href ? "capitalize underline" : "capitalize"
      }
      to={link.href ?? "/"}
      onClick={() => onAction(link.action)}
      state={{ from: location.pathname }}
    >
      {link.label}
    </NavLink>
  );
};

export default HamNavItem;
