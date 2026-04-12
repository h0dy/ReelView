import api, { setAccessToken } from "@/api/api";
import type { AuthUser } from "@/types/users";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useInitAuth = (setUser: (user: AuthUser | null) => void) => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const { data } = await axios.post(
        "/api/refresh",
        {},
        { withCredentials: true }
      );
      setAccessToken(data.token);

      const { data: user } = await api.get<AuthUser>("/api/me");
      setUser(user);
      return user;
    },
    retry: false, // don't retry on 401
    staleTime: Infinity, // don't refetch automatically
  });
};

export default useInitAuth;
