import HeroDescription from "./HeroDescription";

const description =
  "ReelView is a modern movie website where users can explore films, add diary entries, check ratings, and discover new favorites. It brings everything about movies into one simple, easy to use platform";

const Hero = () => {
  return (
    <section className="mx-auto mt-20 grid place-items-center">
      <h1 className="lg:text-4xl sm:text-3xl text-2xl font-bold capitalize">
        ReelView
      </h1>
      <HeroDescription text={description} />
    </section>
  );
};

export default Hero;
