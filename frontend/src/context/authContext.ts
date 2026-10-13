import type { AuthUser } from "@/types/users";
import { createContext } from "react";

type AuthContextType = {
  user: AuthUser | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  isPending: boolean;
};

export const AuthContext = createContext<AuthContextType | null>(null);
