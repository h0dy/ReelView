import useAuth from "@/context/useAuth";
import type { Diary } from "@/types/diary";
import type { AuthUser } from "@/types/users";
import { ArrowRight, Film } from "lucide-react";
import { Link } from "react-router-dom";
import DiaryEntryCard from "./DiaryEntryCard";

const RecentDiaries = ({
  diaries,
  user,
}: {
  diaries: Diary[];
  user: AuthUser;
}) => {
  const { user: currentUser } = useAuth();

  const isOwner = currentUser?.id === user.id;

  const recentDiaries = [...diaries]
    .sort(
      (a, b) =>
        new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime()
    )
    .slice(0, 5);

  return (
    <section className="lg:col-span-2 space-y-8">
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
            Recent Diary
          </h2>
          {diaries.length > recentDiaries.length && (
            <Link
              to={`/${user.username}/diary`}
              className="inline-flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase text-foreground/80 border-foreground/50  px-3.5 py-1.5 transition-all duration-150 hover:text-foreground hover:border-foreground/80  group border-0 border-b"
            >
              See more
              <ArrowRight
                size={16}
                className="transition-transform duration-150 group-hover:translate-x-0.5"
              />
            </Link>
          )}
        </div>

        {recentDiaries.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-border py-16">
            <Film className="h-7 w-7 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-base text-muted-foreground">
              {isOwner
                ? "Nothing logged yet\nGo watch something."
                : `${user.name} hasn't logged anything yet.`}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 place-items-center">
            {recentDiaries.slice(0, 5).map((diary) => (
              <DiaryEntryCard key={diary.id} diary={diary} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentDiaries;
