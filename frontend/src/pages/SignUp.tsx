import SignUpCard from "@/components/signup-page/SignUpCard";

const LogIn = () => {
  return (
    <div className="w-full h-[calc(100vh-64px)] relative flex items-center justify-center">
      <img
        src="https://image.tmdb.org/t/p/original/34AIyUtIbBictlaUBuGuurjJXiA.jpg"
        alt="Arrival"
        className="absolute inset-0 w-full h-full object-cover"
      />

      <div className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-l from-background via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/10 to-transparent" />

      <div className="relative z-10 w-96">
        <SignUpCard />
      </div>
    </div>
  );
};

export default LogIn;
