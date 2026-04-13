import { BookmarkPlus, BookOpen, Check } from "lucide-react";
import { useState } from "react";

const WatchlistDiary = () => {
  const [inWatchlist, setInWatchlist] = useState(false);
  const [inDiary, setInDiary] = useState(false);

  return (
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
  );
};

export default WatchlistDiary;
