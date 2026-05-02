import type { Review } from "@/types/reviews";
import { getUserAvatarInitials } from "@/utils/helpers";
import { AlertTriangle, Star } from "lucide-react";
import { useState } from "react";

const ReviewCard = ({ review }: { review: Review }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = review.text.length > 300;
  const initials = getUserAvatarInitials(review.user);
  const formattedDate = new Date(review.created_at).toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" }
  );

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold uppercase shrink-0">
            {initials}
          </div>
          <div>
            <p className="text-sm font-medium leading-none">
              {review.user.name}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              @{review.user.username} · {formattedDate}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {review.is_spoiler && (
            <span className="flex items-center gap-1 text-xs text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded-full">
              <AlertTriangle className="w-3 h-3" />
              Spoiler
            </span>
          )}
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            {review.rating > 0 && (
              <>
                <Star className="size-3 fill-amber-400 text-amber-400" />
                <span>{review.rating}/10</span>
              </>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {isLong && !expanded ? review.text.slice(0, 300) + "…" : review.text}
      </p>

      {isLong && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="text-xs text-foreground underline underline-offset-2"
        >
          {expanded ? "Show less" : "Read more"}
        </button>
      )}
    </div>
  );
};

export default ReviewCard;
