import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const params = useParams();
  const { username } = params;
  console.log(`username: ${username}`);
  return <div>username: {username}</div>;
};

export default ProfilePage;
