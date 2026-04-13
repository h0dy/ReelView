import { Link } from "react-router-dom";

const AuthGate = () => {
  return (
    <div className="absolute inset-0 backdrop-blur-xs rounded-xl grid place-items-center px-20 bg-black/40 text-center">
      <div className="">
        <Link
          className="text-primary hover:underline font-semibold"
          to={"/login"}
        >
          Sign Up or Log In
        </Link>{" "}
        to review, rate and more
      </div>
    </div>
  );
};

export default AuthGate;
