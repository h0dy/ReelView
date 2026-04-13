import useAuth from "@/context/useAuth";
import { Separator } from "../ui/separator";
import AuthGate from "./AuthGate";
import StarsRatingAction from "./StarsRatingAction";
import WatchlistDiary from "./WatchlistDiary";
import WriteReviewAction from "./WriteReviewAction";

const UserActions = () => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4 relative">
      <WatchlistDiary />

      <Separator />

      <StarsRatingAction />

      <Separator />

      <WriteReviewAction />
      {isLoggedIn() || <AuthGate />}
    </div>
  );
};

export default UserActions;
