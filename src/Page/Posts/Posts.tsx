import Hedaer from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";

function Posts() {
  return (
    <>
      <Hedaer />

      <PostList hasNavigation={false} defaultTab="my" />
      <Footer />
    </>
  );
}

export default Posts;
