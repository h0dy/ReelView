import { useState, type ChangeEvent, type SubmitEvent } from "react";

import { useLogin } from "@/hooks/useLogin";
import type { User } from "@/types/users";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LogInTab = () => {
  const [data, setData] = useState<User>({
    email: "",
    password: "",
  });

  const navigator = useNavigate();
  const { mutate, isPending } = useLogin();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    mutate(data, {
      onSuccess: () => {
        toast.success("Logged in successfully");
        navigator("/");
      },
      onError: () => {
        toast.error("Invalid email or password");
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardContent className="">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={data.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="login-password">Password</Label>
              <a
                href="#"
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="login-password"
              type="password"
              name="password"
              required
              value={data.password}
              onChange={handleChange}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </form>
  );
};

export default LogInTab;
