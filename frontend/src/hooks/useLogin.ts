import { loginUser } from "@/api/auth";
import useAuth from "@/context/useAuth";
import type { User } from "@/types/users";
import { useMutation } from "@tanstack/react-query";

export const useLogin = () => {
  const { login } = useAuth();

  return useMutation({
    mutationFn: (user: User) => loginUser(user),
    onSuccess: (data) => {
      login(data.token, data.user);
    },
  });
};
