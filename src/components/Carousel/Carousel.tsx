import ImageSlider from "./ImageSlider";

const data = [
  {
    img: `https://images.unsplash.com/photo-1700684163033-9dc32ab600a9?q=80&w=1224&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
  },
  {
    img: `https://images.unsplash.com/photo-1682686581580-d99b0230064e?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
  },
  {
    img: `https://images.unsplash.com/photo-1701970909408-1a71154db3c3?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D`,
  },
  {
    img: `https://i.namu.wiki/i/7wSamkQwJZBpI9yoifiRiob5Ec1LzJ8zxIwQ1YDbgVktbB8VZtvuNtMVKwoRAVL6eHru87rSQ7dihwz24ksWUw.webp`,
  },
  {
    img: "https://lwi.nexon.com/maplestory/mobile/29E0ECE19C0FD827/media/thumb_03.jpg",
  },
  {
    img: "https://cdn.gamemeca.com/data_center/246/764/20220703153243.jpg",
  },
];

export default function Carousel() {
  return (
    <div>
      <div className="carousel__container">
        <ImageSlider data={data}></ImageSlider>
      </div>
    </div>
  );
}
