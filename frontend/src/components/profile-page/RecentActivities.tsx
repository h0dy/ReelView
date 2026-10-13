import useAuth from "@/context/useAuth";
import type { Review } from "@/types/reviews";
import type { AuthUser } from "@/types/users";

const RecentActivities = ({
  reviews,
  user,
}: {
  reviews: Review[];
  user: AuthUser;
}) => {
  const { user: currentUser } = useAuth();

  const isOwner = currentUser?.id === user.id;

  const recentReviews = [...reviews]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5);
  return <section>RecentActivities</section>;
};

export default RecentActivities;
