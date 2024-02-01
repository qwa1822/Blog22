import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { UserProps } from "./PostList";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseapp";
import { toast } from "react-toastify";
import Comments from "./Comments";
export default function PostDetail() {
  const params = useParams();

  const [post, setPost] = useState<UserProps | null>(null);

  const navigate = useNavigate();
  const handleDelete = async () => {
    const userAccept = window.confirm("정말 삭제하시겠습니까?");

    if (userAccept && post && post.id) {
      await deleteDoc(doc(db, "posts", post.id));
      toast.success("삭제를 성공했습니다!");

      navigate("/");
    }
  };

  const getPost = async (id: any) => {
    if (id) {
      const docRef = doc(db, "posts", id);
      const docsnap = await getDoc(docRef);

      setPost({ id: docsnap.id, ...(docsnap.data() as UserProps) });
    }
  };
  useEffect(() => {
    if (params?.id) {
      getPost(params?.id);
    }
  }, [params?.id]);

  return (
    <>
      <div className="post__detail">
        {post ? (
          <>
            <div className="post__box">
              <div className="post__title">{post.title}</div>

              <div className="post__profile-box">
                <div className="post__profile" />
                <div className="post__author-name">{post?.email}</div>
                <div className="post__date">{post?.createdAt}</div>
              </div>
              <div className="post__utils-box">
                {post?.category && (
                  <div className="post__category">{post?.category}</div>
                )}
                <div
                  className="post__delete"
                  role="presentation"
                  onClick={handleDelete}
                >
                  삭제
                </div>
                <div className="post__edit">
                  <Link to={`/posts/edit/${post?.id}`}>수정</Link>
                </div>
              </div>
              <div className="post__text post__text-pre-wrap">
                {post?.content}
              </div>
            </div>
            <Comments post={post} getpost={getPost} />
          </>
        ) : (
          <div>없습니다</div>
        )}
      </div>
    </>
  );
}
