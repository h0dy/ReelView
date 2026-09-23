import type { Diary } from "@/types/diary";
import { formatShortDate } from "@/utils/helpers";
import { CalendarDays, Film } from "lucide-react";
import { Link } from "react-router-dom";

const DiaryEntryCard = ({ diary }: { diary: Diary }) => {
  return (
    <Link to={`/movies/${diary.movie.tmdb_id}`} className="group w-full">
      <div className="relative aspect-2/3 overflow-hidden rounded-md bg-secondary">
        {diary.movie.poster_path ? (
          <img
            src={diary.movie.poster_path}
            alt={diary.movie.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <Film className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
          </div>
        )}
      </div>
      <p
        className="mt-2 truncate text-sm text-foreground/80"
        title={diary.movie.title}
      >
        {diary.movie.title}
      </p>
      <p className="flex items-center gap-1 text-xs text-muted-foreground">
        <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />
        {formatShortDate(diary.watched_at)}
      </p>
    </Link>
  );
};

export default DiaryEntryCard;
