import { useContext } from "react";
import { Link } from "react-router-dom";
import { BsSun, BsSunFill } from "react-icons/bs";
import ThemeContext from "../redux/TemaContext";

export default function Footer() {
  const context = useContext(ThemeContext);

  return (
    <footer>
      <Link to="/posts/new">글쓰기</Link>
      <Link to="/posts">게시글</Link>
      <Link to="/posts/new">프로필</Link>
      <div>
        {context.theme === "light" ? (
          <BsSun className="btn__Theme" onClick={context.toggleMode} />
        ) : (
          <BsSunFill className="btn__Theme" onClick={context.toggleMode} />
        )}
      </div>
    </footer>
  );
}
