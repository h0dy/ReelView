import { BookmarkPlus, BookOpen, Check, NotebookPen, Star } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Textarea } from "../ui/textarea";

const MovieUserAction = () => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inDiary, setInDiary] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4">
      {/* Watchlist + Diary buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => setInWatchlist((v) => !v)}
          className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-xs font-medium transition-colors ${
            inWatchlist
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border hover:bg-muted"
          }`}
        >
          {inWatchlist ? (
            <Check className="w-4 h-4" />
          ) : (
            <BookmarkPlus className="w-4 h-4" />
          )}
          {inWatchlist ? "In Watchlist" : "Watchlist"}
        </button>

        <button
          onClick={() => setInDiary((v) => !v)}
          className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-xs font-medium transition-colors ${
            inDiary
              ? "bg-primary text-primary-foreground border-primary"
              : "border-border hover:bg-muted"
          }`}
        >
          {inDiary ? (
            <Check className="w-4 h-4" />
          ) : (
            <BookOpen className="w-4 h-4" />
          )}
          {inDiary ? "In Diary" : "Diary"}
        </button>
      </div>

      <Separator />

      {/* Star rating */}
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
                  star <= (hoverRating || userRating)
                    ? "#fbbf24"
                    : "transparent"
                }
                stroke={
                  star <= (hoverRating || userRating)
                    ? "#fbbf24"
                    : "currentColor"
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

      <Separator />

      {/* Review */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Write a Review
        </p>
        {reviewSubmitted ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground p-3 rounded-lg bg-muted/50">
            <Check className="w-4 h-4 text-green-500" />
            <span>Review submitted!</span>
            <button
              className="ml-auto text-xs underline"
              onClick={() => setReviewSubmitted(false)}
            >
              Edit
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <Textarea
              placeholder="What did you think?"
              value={review}
              onChange={(e) => setReview(e.target.value)}
              className="resize-none text-sm"
              rows={3}
            />
            <Button
              size="sm"
              className="w-full gap-2"
              disabled={review.trim().length === 0}
              onClick={() => setReviewSubmitted(true)}
            >
              <NotebookPen className="w-3.5 h-3.5" />
              Submit Review
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieUserAction;
