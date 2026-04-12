import { setAccessToken } from "@/api/api";
import useInitAuth from "@/hooks/useInitAuth";
import type { AuthUser } from "@/types/users";
import { useState } from "react";
import { AuthContext } from "./auth-context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const { isPending } = useInitAuth(setUser); // 👈 get isLoading here

  const login = (token: string, user: AuthUser) => {
    setAccessToken(token);
    setUser(user);
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
  };

  const isLoggedIn = () => {
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
