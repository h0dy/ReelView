import useAuth from "@/context/useAuth";
import type { JSX } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  if (isLoggedIn()) {
    navigate(from);
  }

  return children;
};

export default GuestRoute;
