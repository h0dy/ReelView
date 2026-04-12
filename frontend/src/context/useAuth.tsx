import { useContext } from "react";
import { AuthContext } from "./auth-context";

const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside provider");
  return ctx;
};

export default useAuth;
