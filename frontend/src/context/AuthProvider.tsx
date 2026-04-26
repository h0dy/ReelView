import { setAccessToken } from "@/api/api";
import { logoutUser } from "@/api/auth";
import useInitAuth from "@/hooks/useInitAuth";
import type { AuthUser } from "@/types/users";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { isPending } = useInitAuth(setUser);
  const navigator = useNavigate();

  const login = (token: string, user: AuthUser) => {
    setAccessToken(token);
    setUser(user);
  };

  const logout = async () => {
    await logoutUser();
    setUser(null);
    navigator("/");
  };

  const isLoggedIn = () => {
    if (isPending) {
      return false;
    }
    return !!user;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isLoggedIn, isPending }}
    >
      {children}
    </AuthContext.Provider>
  );
};
