import type { Movie } from "@/types/movies";
import DetailRow from "./DetailRow";

const MovieDetailsCard = ({ movie }: { movie: Movie }) => {
  const movieReleaseDate = new Date(movie.release_date);
  const formattedVoteCount = new Intl.NumberFormat().format(movie.vote_count);
  const formattedRating = movie.vote_average.toFixed(1);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-1">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Details
      </h2>
      <DetailRow label="Original title" value={movie.original_title} />
      <DetailRow label="Directed By" value={"Robert Eggers"} />
      <DetailRow
        label="Language"
        value={movie.original_language.toUpperCase()}
      />
      <DetailRow
        label="Release date"
        value={movieReleaseDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      />
      <DetailRow
        label="Runtime"
        value={`${Math.floor(160 / 60)}h ${160 % 60}m`}
      />
      <DetailRow label="Vote count" value={formattedVoteCount} />
      <DetailRow label="Rating" value={`${formattedRating} / 10`} last={true} />
    </div>
  );
};

export default MovieDetailsCard;
