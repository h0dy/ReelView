const HeroDescription = ({ text }: { text: string }) => {
  return (
    <p className="sm:text-xl text-base sm:tracking-wide py-10 text-muted-foreground">
      {text}
    </p>
  );
};

export default HeroDescription;
