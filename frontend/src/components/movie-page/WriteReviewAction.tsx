import api from "@/api/api";
import type { MovieDetails, UserMovieMeta } from "@/types/movies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Check, NotebookPen } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const WriteReviewAction = ({ data }: { data: UserMovieMeta }) => {
  const { movie_id, tmdb_id } = data;
  const queryClient = useQueryClient();

  const existingReview = data.review?.text;
  const [review, setReview] = useState(existingReview ?? "");
  const [isEditing, setIsEditing] = useState(!existingReview);

  const reviewSubmitted = !!existingReview && !isEditing;

  const submitReview = useMutation({
    mutationFn: (body: { text: string; rating: number; is_spoiler: boolean }) =>
      data.review?.id
        ? api.put(`/api/movies/${movie_id}/reviews/${data.review?.id}`, body)
        : api.post(`/api/movies/${movie_id}/reviews`, body),

    onSuccess: () => {
      toast.success("Review submitted!");
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["movie", tmdb_id] });
    },

    onError: (err) => {
      console.log("error:", err);

      toast.error("Something went wrong, please try again");
    },
  });

  const deleteReview = useMutation({
    mutationFn: () =>
      api.delete(`/api/movies/${movie_id}/reviews/${data.review?.id}`),

    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["movie", tmdb_id] });
      const previous = queryClient.getQueryData(["movie", tmdb_id]);

      queryClient.setQueryData<MovieDetails>(["movie", tmdb_id], (old) => {
        if (!old) return old;
        return {
          ...old,
          user_metadata: {
            ...old.user_metadata,
            review: undefined,
          },
        };
      });

      return { previous };
    },

    onSuccess: () => {
      toast.success("Review removed");
      setReview("");
      setIsEditing(true);
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["movie", tmdb_id], context?.previous);
      toast.error("Something went wrong, please try again");
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", tmdb_id] });
    },
  });

  const handleSubmit = () => {
    submitReview.mutate({
      text: review,
      rating: data.review?.rating ?? 0,
      is_spoiler: data.review?.is_spoiler ?? false,
    });
  };

  const handleDelete = () => {
    if (data.review?.rating) {
      // keep the review entry but clear the text
      submitReview.mutate({
        text: "",
        rating: data.review.rating,
        is_spoiler: data.review?.is_spoiler ?? false,
      });
    } else {
      deleteReview.mutate();
    }
  };

  const isPending = submitReview.isPending || deleteReview.isPending;
  const isError = submitReview.isError || deleteReview.isError;

  return (
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
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
          <button
            className="text-xs text-destructive underline"
            onClick={handleDelete}
            disabled={isPending}
          >
            Remove
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
          {isError && (
            <p className="text-xs text-destructive">
              Something went wrong, try again.
            </p>
          )}
          <Button
            size="sm"
            className="w-full gap-2"
            disabled={isPending || review.trim().length === 0}
            onClick={handleSubmit}
          >
            <NotebookPen className="w-3.5 h-3.5" />
            {isPending
              ? "Saving..."
              : existingReview
              ? "Update Review"
              : "Submit Review"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default WriteReviewAction;
