import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="h-screen grid place-items-center">
      <h1 className="text-4xl capitalize">welcome to ReelView </h1>
      <Link to={"/about"}>
        <Button>About</Button>
      </Link>{" "}
    </div>
  );
};

export default Landing;
