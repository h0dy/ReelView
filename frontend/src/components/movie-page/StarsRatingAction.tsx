import { Star } from "lucide-react";
import { useState } from "react";

const StarsRatingAction = () => {
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Your Rating
      </p>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => setUserRating(star)}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className="w-5 h-5"
              fill={
                star <= (hoverRating || userRating) ? "#fbbf24" : "transparent"
              }
              stroke={
                star <= (hoverRating || userRating) ? "#fbbf24" : "currentColor"
              }
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {userRating > 0 && (
        <p className="text-xs text-muted-foreground">{userRating} / 10</p>
      )}
    </div>
  );
};

export default StarsRatingAction;
