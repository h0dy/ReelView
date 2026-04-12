import { Button } from "../ui/button";
import { CardContent, CardFooter } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SignUpTab = () => {
  return (
    <>
      <CardContent className="">
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="signup-name">Name</Label>
            <Input id="signup-name" type="text" placeholder="Hasan" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-username">Username</Label>
            <Input
              id="signup-username"
              type="text"
              placeholder="example37"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="signup-password">Password</Label>
            <Input id="signup-password" type="password" required />
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-5">
        <Button type="submit" className="w-full">
          Create Account
        </Button>
      </CardFooter>
    </>
  );
};

export default SignUpTab;
