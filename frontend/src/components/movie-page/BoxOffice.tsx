import { TrendingUp } from "lucide-react";

const BoxOffice = ({ revenue }: { revenue: number }) => {
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(revenue);
  return (
    <div className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
      <div className="p-2 rounded-lg bg-emerald-500/10">
        <TrendingUp className="w-4 h-4 text-emerald-500" />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">Box office</p>
        <p className="text-lg font-semibold">{formattedRevenue}</p>
      </div>
    </div>
  );
};

export default BoxOffice;
