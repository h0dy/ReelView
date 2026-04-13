import { Check, NotebookPen } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const WriteReviewAction = () => {
  const [review, setReview] = useState("");
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
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
  );
};

export default WriteReviewAction;
