import api from "@/api/api";
import type { MovieDetails, UserMovieMeta } from "@/types/movies";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Calendar, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import DiaryBtn from "./DiaryBtn";
import WatchlistBtn from "./WatchlistBtn";

const WatchlistDiary = ({ data }: { data: UserMovieMeta }) => {
  const today = () => new Date().toISOString().split("T")[0];
  const diaryDate = data.diary?.watched_at ?? today();
  const inDiary = !!data.diary?.id;
  const [showDiaryPanel, setShowDiaryPanel] = useState(false);
  const [date, setDate] = useState(diaryDate);
  const panelRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!showDiaryPanel) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setShowDiaryPanel(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDiaryPanel]);

  const handleOpenPanel = () => {
    setDate(data.diary?.watched_at?.split("T")[0] ?? today());
    setShowDiaryPanel(true);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: (action: "add" | "update" | "remove") => {
      if (action === "update") {
        if (!data.diary?.id) throw new Error("Missing diary id");
        return api.put(`/api/diaries/${data.diary.id}`, { watched_at: date });
      } else if (action === "remove") {
        return api.delete(`/api/diaries/${data.diary?.id}`);
      } else {
        return api.post(`/api/movies/${data.movie_id}/diaries`, {
          watched_at: date,
        });
      }
    },

    onMutate: async (action) => {
      await queryClient.cancelQueries({ queryKey: ["movie", data.tmdb_id] });
      const previous = queryClient.getQueryData(["movie", data.tmdb_id]);

      queryClient.setQueryData<MovieDetails>(["movie", data.tmdb_id], (old) => {
        if (!old) return old;
        return {
          ...old,
          user_metadata: {
            ...old.user_metadata,
            diary:
              action === "remove"
                ? undefined
                : {
                    id: data.diary?.id ?? crypto.randomUUID(),
                    watched_at: date,
                    created_at: data.diary?.created_at ?? today(),
                  },
          },
        };
      });

      return { previous };
    },

    onError: (_err, _vars, context) => {
      queryClient.setQueryData(["movie", data.tmdb_id], context?.previous);
      toast.error("Something went wrong, please try again");
    },

    onSuccess: (_data, action) => {
      if (action === "remove") {
        toast.success("Removed from diary");
        setDate(today);
      } else {
        toast.success(action === "update" ? "Diary updated" : "Added to diary");
      }
      setShowDiaryPanel(false);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["movie", data.tmdb_id] });
    },
  });

  return (
    <div className="relative" ref={panelRef}>
      <div className="grid grid-cols-2 gap-2">
        <WatchlistBtn data={data} />
        <DiaryBtn
          inDiary={inDiary}
          isPending={isPending}
          onClick={handleOpenPanel}
        />
      </div>

      {showDiaryPanel && (
        <div className="absolute top-full left-0 right-0 mt-2 z-50 bg-card border border-border rounded-xl shadow-xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider font-semibold text-muted-foreground">
              <Calendar className="w-3 h-3" />
              Date Watched
            </label>
            <button
              onClick={() => setShowDiaryPanel(false)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <input
            type="date"
            value={date}
            max={new Date().toISOString().split("T")[0]}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
          />

          <div className="flex gap-2">
            <button
              onClick={() => mutate(inDiary ? "update" : "add")}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground text-xs font-semibold py-2 rounded-lg transition-colors"
            >
              {inDiary ? "Update" : "Add to Diary"}
            </button>
            {inDiary && (
              <button
                onClick={() => mutate("remove")}
                className="px-3 py-2 rounded-lg border border-destructive text-destructive hover:bg-destructive/10 text-xs font-semibold transition-colors"
              >
                Remove
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchlistDiary;
