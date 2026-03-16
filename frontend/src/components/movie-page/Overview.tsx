const Overview = ({ overview }: { overview: string }) => {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Overview
      </h2>
      <p className="text-base leading-relaxed text-muted-foreground">
        {overview}
      </p>
    </section>
  );
};

export default Overview;
