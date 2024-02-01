import Hedaer from "../../components/Header";
import Profile from "../../components/Profile";
import PostList from "../../components/PostList";
import Footer from "../../components/Footer";

export default function ProfilePage() {
  return (
    <>
      <Hedaer />
      <Profile />
      <PostList hasNavigation={false} />
      <Footer />
    </>
  );
}
