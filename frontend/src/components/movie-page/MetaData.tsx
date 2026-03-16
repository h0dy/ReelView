import type { MovieDetail } from "@/types/movies";
import { Calendar } from "lucide-react";
import { Badge } from "../ui/badge";

const MetaData = ({ movie }: { movie: MovieDetail }) => {
  const movieReleaseDate = new Date(movie.release_date);

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap gap-2">
        {movie.genre.map((g) => (
          <Badge key={g.id} variant="secondary">
            {g.name}
          </Badge>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar className="w-3.5 h-3.5" />
        <span>
          {movieReleaseDate.toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default MetaData;
