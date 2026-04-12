import { Skeleton } from "@/components/ui/skeleton";

const GridSkeleton = ({ count = 10 }: { count?: number }) => {
  return (
    <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center mt-5">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full max-w-60 space-y-3">
          <Skeleton className="w-full h-90 rounded-none" />
        </div>
      ))}
    </div>
  );
};

export default GridSkeleton;
