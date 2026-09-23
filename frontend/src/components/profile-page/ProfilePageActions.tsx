import useAuth from "@/context/useAuth";
import type { Diary } from "@/types/diary";
import type { AuthUser } from "@/types/users";
import { formatMonthYear } from "@/utils/helpers";
import { Crown, Pencil, Share2 } from "lucide-react";
import { toast } from "sonner";

function ProfilePageActions({
  user,
  diaries,
}: {
  user: AuthUser;
  diaries: Diary[];
}) {
  const { user: currentUser } = useAuth();
  const isOwner = currentUser?.id === user.id;

  const thisYear = new Date().getFullYear();
  const loggedThisYear = diaries.filter(
    (d) => new Date(d.watched_at).getFullYear() === thisYear
  ).length;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Profile link copied");
  };
  return (
    <aside className="space-y-4">
      <div className="rounded-lg border border-border bg-card p-4">
        <div className="flex gap-2">
          <button
            onClick={handleShare}
            className="flex flex-1 items-center justify-center gap-2 rounded-full border border-border px-4 py-2 text-base text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
          >
            <Share2 className="h-4 w-4" strokeWidth={1.75} />
            Share
          </button>
          {isOwner && (
            <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-base text-primary-foreground transition-colors hover:bg-primary/90">
              <Pencil className="h-4 w-4" strokeWidth={1.75} />
              Edit
            </button>
          )}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-3">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
          Stats
        </h2>
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Films logged</span>
          <span className="text-foreground">{diaries.length}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">In {thisYear}</span>
          <span className="text-foreground">{loggedThisYear}</span>
        </div>
        <div className="flex items-center justify-between text-base">
          <span className="text-muted-foreground">Member since</span>
          <span className="text-foreground">
            {formatMonthYear(user.created_at)}
          </span>
        </div>
        {user.is_premium && (
          <div className="flex w-fit items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-sm text-primary">
            <Crown className="h-3.5 w-3.5" strokeWidth={2} />
            Premium
          </div>
        )}
      </div>

      <div className="rounded-lg border border-border bg-card p-4 space-y-2">
        <h2 className="text-sm uppercase tracking-wider text-muted-foreground">
          Bio
        </h2>
        {user.bio ? (
          <p className="text-base leading-relaxed text-foreground/80">
            {user.bio}
          </p>
        ) : (
          <p className="text-base italic leading-relaxed text-muted-foreground">
            {isOwner
              ? "You haven't written a bio yet."
              : `${user.name} hasn't written a bio yet.`}
          </p>
        )}
      </div>
    </aside>
  );
}

export default ProfilePageActions;
