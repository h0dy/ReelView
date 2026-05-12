import type { NavElement } from "@/types/navbar";

export const navLinks: NavElement[] = [
  { href: "/about", label: "about", access: "public" },
  { href: "/login", label: "log in", access: "guest" },
  { label: "log out", access: "auth", action: "logout" },
  { label: "Profile", access: "auth", action: "profile" },
];
