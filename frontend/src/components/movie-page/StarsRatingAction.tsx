import api from "@/api/api";
import type { UserMovieMeta } from "@/types/movies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const StarsRatingAction = ({ data }: { data: UserMovieMeta }) => {
  const { movie_id, tmdb_id } = data;
  const rating = data.review?.rating;
  const [userRating, setUserRating] = useState(rating ?? 0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(!!rating);
  const existingReview = data.review;

  const queryClient = useQueryClient();

  const submitRating = useMutation({
    mutationFn: (body: { text: string; rating: number; is_spoiler: boolean }) =>
      existingReview
        ? api.put(`/api/movies/${movie_id}/reviews/${data.review?.id}`, body)
        : api.post(`/api/movies/${movie_id}/reviews`, body),

    onSuccess: () => {
      toast.success("Rating submitted!");
      queryClient.invalidateQueries({ queryKey: ["movie", tmdb_id] });
    },

    onError: (err) => {
      console.log("error:", err);
      toast.error("Something went wrong, please try again");
    },
  });

  const deleteRating = useMutation({
    mutationFn: (body: { text: string; rating: number; is_spoiler: boolean }) =>
      api.put(`/api/movies/${movie_id}/reviews/${data.review?.id}`, body),
    onSuccess: () => {
      toast.success("Rating removed");
      setUserRating(0);
      setRatingSubmitted(false);
      queryClient.invalidateQueries({ queryKey: ["movie", tmdb_id] });
    },
    onError: () => toast.error("Something went wrong, please try again"),
  });

  const handleSubmit = () => {
    setRatingSubmitted(true);
    submitRating.mutate({
      text: data.review?.text ?? "",
      is_spoiler: data.review?.is_spoiler ?? false,
      rating: userRating,
    });
  };

  const handleDelete = () => {
    setRatingSubmitted(true);
    deleteRating.mutate({
      text: data.review?.text ?? "",
      is_spoiler: data.review?.is_spoiler ?? false,
      rating: 0,
    });
  };

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Your Rating
      </p>
      <div className="flex gap-0.5">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((star) => (
          <button
            key={star}
            onClick={() => {
              setUserRating(star);
              setRatingSubmitted(false);
            }}
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            className="transition-transform hover:scale-110"
          >
            <Star
              className="size-5"
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
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{userRating} / 10</p>
          {ratingSubmitted ? (
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <Check className="w-3 h-3 text-green-500" /> Saved
              <button
                onClick={() => setRatingSubmitted(false)}
                className="text-xs text-primary hover:underline"
              >
                Edit
              </button>
              <button
                onClick={handleDelete}
                className="text-xs text-destructive hover:underline"
              >
                Remove
              </button>
            </span>
          ) : (
            <button
              onClick={handleSubmit}
              className="text-xs font-semibold text-primary hover:underline"
            >
              Save Rating
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StarsRatingAction;
