import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LogInTab from "./LogInTab";
import SignUpTab from "./SignUpTab";

const SignUpCard = () => {
  return (
    <Tabs defaultValue="login" className="w-full max-w-sm">
      <Card>
        <CardHeader className="pb-0">
          <TabsList className="grid w-full grid-cols-2 mb-3">
            <TabsTrigger value="login">Log In</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>

          <TabsContent value="signup">
            <CardTitle>Sign Up To ReelView</CardTitle>
            <CardDescription>
              Enter your details below to create your account
            </CardDescription>
          </TabsContent>

          <TabsContent value="login">
            <CardTitle>Log In To ReelView</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </TabsContent>
        </CardHeader>

        {/* Sign Up Tab */}
        <TabsContent value="signup">
          <SignUpTab />
        </TabsContent>

        {/* Log In Tab */}
        <TabsContent value="login">
          <LogInTab />
        </TabsContent>
      </Card>
    </Tabs>
  );
};

export default SignUpCard;
