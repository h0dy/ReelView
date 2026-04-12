import useAuth from "@/context/useAuth";
import type { NavElement } from "@/types/navbar";
import { Link } from "react-router-dom";

const HamNavItem = ({ link }: { link: NavElement }) => {
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
    <Link className="capitalize " to={link.href}>
      {link.label}
    </Link>
  );
};

export default HamNavItem;
