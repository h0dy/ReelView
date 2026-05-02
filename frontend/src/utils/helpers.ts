import type { AuthUser } from "@/types/users";

export const getUserAvatarInitials = (user: AuthUser): string => {
  if (user.name) {
    const parts = user.name.trim().split(" ");
    return parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
      : parts[0][0].toUpperCase();
  }
  return user.username[0].toUpperCase();
};
