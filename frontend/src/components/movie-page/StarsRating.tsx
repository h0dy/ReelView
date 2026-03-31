import { Star } from "lucide-react";

const StarsRating = ({ rating }: { rating: number }) => {
  const formattedRating = rating.toFixed(1);

  return (
    <div className="flex items-center gap-1.5">
      <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
      <span className="text-foreground">{formattedRating}/10</span>
    </div>
  );
};

export default StarsRating;
