import { BookOpen, Check, Loader2 } from "lucide-react";

const DiaryBtn = ({
  inDiary,
  isPending,
  onClick,
}: {
  inDiary: boolean;
  isPending: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      disabled={isPending}
      className={`flex flex-col items-center gap-1 py-3 rounded-lg border text-xs font-medium transition-colors ${
        inDiary
          ? "bg-primary text-primary-foreground border-primary"
          : "border-border hover:bg-muted"
      } disabled:opacity-50`}
    >
      {isPending ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : inDiary ? (
        <Check className="w-4 h-4" />
      ) : (
        <BookOpen className="w-4 h-4" />
      )}
      <span>{inDiary ? "In Diary" : "Diary"}</span>
    </button>
  );
};

export default DiaryBtn;
