import api from "@/api/api";
import type { MovieDetails, UserMovieMeta } from "@/types/movies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookmarkPlus, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

const WatchlistBtn = ({ data }: { data: UserMovieMeta }) => {
  const { is_in_watchlist, movie_id, tmdb_id } = data;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      // if already in watchlist delete if not, post
      is_in_watchlist
        ? api.delete(`/api/movies/${movie_id}/watchlist`)
        : api.post(`/api/movies/${movie_id}/watchlist`),

    onMutate: async () => {
      // cancels any in-flight fetch for this movie so it doesn't land after optimistic update and overwrite it
      await queryClient.cancelQueries({ queryKey: ["movie", tmdb_id] });
      // get the current cache if the request fails
      const previous = queryClient.getQueryData(["movie", tmdb_id]);

      // update ui
      queryClient.setQueryData<MovieDetails>(["movie", tmdb_id], (old) => {
        if (!old) return old;
        return {
          ...old,
          user_metadata: {
            ...old.user_metadata,
            is_in_watchlist: !is_in_watchlist,
          },
        };
      });

      return { previous }; // pass current cache to onError
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["movie", tmdb_id], context?.previous);
      toast.error("Something went wrong, please try again");
    },

    onSuccess: () => {
      // onSuccess runs after the mutation, but is_in_watchlist holds the old value
      toast.success(
        !is_in_watchlist ? "Removed from watchlist" : "Added to watchlist"
      );
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", tmdb_id] });
    },
  });

  return (
    <button
      onClick={() => mutate()}
      disabled={isPending}
      className={`flex flex-col items-center gap-1.5 py-3 rounded-lg border text-xs font-medium transition-colors ${
        is_in_watchlist
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border hover:bg-muted"
      } disabled:opacity-50`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : is_in_watchlist ? (
        <Check className="w-4 h-4" />
      ) : (
        <BookmarkPlus className="w-4 h-4" />
      )}
      {is_in_watchlist ? "In Watchlist" : "Watchlist"}
    </button>
  );
};

export default WatchlistBtn;
