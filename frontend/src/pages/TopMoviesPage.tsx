import TopMoviesGrid from "@/components/top-page/TopMoviesGrid";
import TopPeriod from "@/components/top-page/TopPeriod";
import { Suspense, useState } from "react";
import { useSearchParams } from "react-router-dom";

const TopMoviesPage = () => {
  const [searchParams] = useSearchParams();
  let p = searchParams.get("period");
  if (!p) {
    p = "day";
  }
  const [period, setPeriod] = useState(p);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto py-12">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-muted-foreground mb-2">
            top movies
          </p>
          <div className="flex justify-between">
            <h1 className="text-2xl font-bold tracking-tight text-muted-foreground">
              {period === "week" ? "This week" : "Today"}
            </h1>

            <TopPeriod period={period} setPeriod={setPeriod} />
          </div>
          <div className="mt-3 h-px bg-border" />
        </div>
        <div className="px-5">
          <Suspense>
            <TopMoviesGrid period={period} />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default TopMoviesPage;
