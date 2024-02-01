import { useState, useEffect } from "react";
import "./ImageSlider.css"; // CSS 파일 추가

interface StateProps {
  img: string;
}

interface ImageProps {
  data: StateProps[];
}

export default function ImageSlider({ data }: ImageProps) {
  const [currentIndex, setCurrentUser] = useState(0);

  // 이미지 전환을 감지하기 위한 플래그
  const [transition, setTransition] = useState(false);

  // 이미지 전환 후 플래그를 리셋하는 함수
  const resetTransition = () => {
    setTransition(false);
  };

  useEffect(() => {
    // 이미지가 변경될 때마다 플래그를 활성화하여 트랜지션을 시작합니다.
    setTransition(true);

    // 트랜지션 후에 플래그를 리셋합니다.
    const transitionTimeout = setTimeout(resetTransition, 500); // 500ms는 CSS 트랜지션의 지속 시간과 일치해야 합니다.

    // 컴포넌트가 언마운트되거나 이미지가 변경되면 타임아웃을 클리어합니다.
    return () => clearTimeout(transitionTimeout);
  }, [currentIndex, data]);

  const sliderStyles: any = {
    height: "100%",
    position: "relative",
  };

  const slidesStyles: any = {
    width: "100%",
    height: "100%",
    borderRadius: "10px",
    backgroundPosition: "center",
    backgroundSize: "cover",
    backgroundImage: `url(${data[currentIndex].img})`,
    opacity: transition ? 0 : 1, // 트랜지션 중에는 투명도를 0으로 설정하여 페이드 아웃 효과를 생성합니다.
    transition: "opacity 0.5s ease-in-out", // 트랜지션 속성 추가
  };

  const leftArrowStlyes: any = {
    position: "absolute",
    top: "50%",
    left: "32px",
    transform: "translate(0,-50%)",
    fontSize: "45px",
    color: "#fff",
    zIndex: "1",
    cursor: "pointer",
  };

  const RightArrowStyle: any = {
    position: "absolute",
    top: "50%",
    right: "32px",
    transform: "translate(0,-50%)",
    fontSize: "45px",
    color: "#fff",
    zIndex: "1",
    cursor: "pointer",
  };

  const nextSlides = () => {
    setCurrentUser(prev => (prev === data.length - 1 ? 0 : ++prev));
  };

  const prevSlides = () => {
    setCurrentUser(prev => (prev === 0 ? data.length - 1 : --prev));
  };

  return (
    <div style={sliderStyles}>
      <div style={leftArrowStlyes} onClick={prevSlides}>
        {"<"}
      </div>
      <div style={RightArrowStyle} onClick={nextSlides}>
        {">"}
      </div>
      <div style={slidesStyles}></div>
    </div>
  );
}
