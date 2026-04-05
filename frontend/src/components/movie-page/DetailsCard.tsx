import type { MovieDetail } from "@/types/movies";
import DetailRow from "./DetailRow";

const DetailsCard = ({ movie }: { movie: MovieDetail }) => {
  const movieReleaseDate = new Date(movie.release_date);
  const formattedVoteCount = new Intl.NumberFormat().format(movie.vote_count);
  const formattedRating = movie.vote_average.toFixed(1);
  const formattedRevenue = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(movie.revenue);

  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-1">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
        Details
      </h2>
      <DetailRow label="Original title" value={movie.original_title} />
      <DetailRow
        label="Release date"
        value={movieReleaseDate.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      />
      {movie.runtime > 0 && (
        <DetailRow
          label="Runtime"
          value={`${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`}
        />
      )}
      <DetailRow label="Vote count (TMDB)" value={formattedVoteCount} />
      <DetailRow label="Rating (TMDB)" value={`${formattedRating} / 10`} />

      <DetailRow label="Box office" value={formattedRevenue} last={true} />
    </div>
  );
};

export default DetailsCard;
