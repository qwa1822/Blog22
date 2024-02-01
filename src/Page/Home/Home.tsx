import Hedaer from "../../components/Header";
import Footer from "../../components/Footer";
import PostList from "../../components/PostList";
import Carousel from "../../components/Carousel/Carousel";

function Home() {
  return (
    <>
      <Hedaer />
      <Carousel />
      <PostList hasNavigation={true} />

      <Footer />
    </>
  );
}

export default Home;
