export type AuthUser = {
  id: string; // UUID as string
  username: string;
  name: string;
  created_at: string;
  updated_at: string;
  email: string;
  is_premium: boolean;
};
