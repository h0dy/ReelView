const StatCard = ({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) => {
  return (
    <div className="rounded-lg bg-muted/50 p-3 flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={`text-2xl font-semibold tabular-nums ${
          accent ? "text-amber-500" : ""
        }`}
      >
        {value}
      </span>
      <span className="text-xs text-muted-foreground">{sub}</span>
    </div>
  );
};

export default StatCard;
