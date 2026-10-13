import { getUser } from "@/api/users";
import Loader from "@/components/global/Loader";
import Header from "@/components/profile-page/Header";
import ProfilePageActions from "@/components/profile-page/ProfilePageActions";
import RecentActivities from "@/components/profile-page/RecentActivities";
import RecentDiaries from "@/components/profile-page/RecentDiaries";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();

  const { data, isLoading } = useQuery({
    queryKey: ["user", username],
    queryFn: () => getUser(username as string),
  });

  if (isLoading) {
    return <Loader page={true} />;
  }

  if (!data) {
    return (
      <p className="p-10 text-center text-base text-muted-foreground">
        Something went wrong
      </p>
    );
  }

  const { user, diaries, reviews } = data;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto px-6">
        <Header diariesLength={diaries.length} user={user} />
      </div>

      <div className="mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RecentDiaries diaries={diaries} user={user} />
        <ProfilePageActions diaries={diaries} user={user} />
        <RecentActivities reviews={reviews} user={user} />
      </div>
    </div>
  );
};

export default ProfilePage;
