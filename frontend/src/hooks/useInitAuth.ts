import api, { setAccessToken } from "@/api/api";
import type { AuthUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

// useInitAuth func gets a new access token and user on app load/hard refresh
const useInitAuth = (setUser: (user: AuthUser | null) => void) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await axios.post(
        "/api/auth/refresh",
        {},
        { withCredentials: true }
      );
      setAccessToken(data.token);

      const { data: user } = await api.get<AuthUser>("/api/auth/me");
      setUser(user);
      return user;
    },
    retry: false, // don't retry on 401
    staleTime: Infinity, // don't refetch automatically
  });
};

export default useInitAuth;
