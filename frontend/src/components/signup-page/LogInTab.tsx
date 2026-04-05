import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const LogInTab = () => {
  return (
    <>
      <CardContent className="">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="m@example.com"
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
            <Input id="login-password" type="password" required />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <Button type="submit" className="w-full">
          Login
        </Button>
      </CardFooter>
    </>
  );
};

export default LogInTab;
