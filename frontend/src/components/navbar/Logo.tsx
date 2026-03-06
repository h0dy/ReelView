import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to={"/"}>
      <h3 className="ml-2 font-bold text-foreground capitalize hover:underline">
        Reel<span className="text-primary">View</span>
      </h3>
    </Link>
  );
};

export default Logo;
