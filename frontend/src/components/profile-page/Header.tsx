import type { AuthUser } from "@/types/users";

const Header = ({
  user,
  diariesLength,
}: {
  user: AuthUser;
  diariesLength: number;
}) => {
  return (
    <div className="flex flex-col gap-6 md:flex-row md:items-start my-14">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-muted text-3xl font-bold">
        {user.username[0].toUpperCase()}
      </div>

      <div className="flex-1 space-y-3">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-bold">{user.name}</h1>

            {user.is_premium && (
              <span className="rounded-full bg-yellow-500/10 px-2 py-1 text-xs font-medium text-yellow-500">
                PRO
              </span>
            )}
          </div>

          <p className="text-muted-foreground">@{user.username}</p>
        </div>

        <p className="max-w-2xl text-sm leading-relaxed">
          {user.bio || "No bio yet."}
        </p>

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          <span>
            Joined{" "}
            {new Date(user.created_at).toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>

          <span>•</span>

          <span>
            {diariesLength} {diariesLength === 1 ? "film" : "films"} watched
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
