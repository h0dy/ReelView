import useAuth from "@/context/useAuth";
import type { MovieDetails } from "@/types/movies";
import { Separator } from "../ui/separator";
import AuthGate from "./AuthGate";
import StarsRatingAction from "./StarsRatingAction";
import WatchlistDiary from "./WatchlistDiary";
import WriteReviewAction from "./WriteReviewAction";

const UserActions = ({ data }: { data: MovieDetails }) => {
  const { isLoggedIn } = useAuth();
  return (
    <div className="rounded-xl border border-border bg-card p-4 space-y-4 relative">
      <WatchlistDiary data={data.user_metadata} />
      <Separator />
      <StarsRatingAction data={data.user_metadata} />
      <Separator />
      <WriteReviewAction data={data.user_metadata} />
      {!isLoggedIn() && <AuthGate />}
    </div>
  );
};

export default UserActions;
