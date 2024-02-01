import React, { useContext, useState } from "react";
import { UserProps } from "./PostList";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseapp";
import AuthContext from "../redux/UserAuth";
import { toast } from "react-toastify";

interface CommentProps {
  post: UserProps;
  getpost: (id: string) => Promise<void>;
}
export default function Comments({ post, getpost }: CommentProps) {
  const [comment, setComment] = useState("");

  const { user } = useContext(AuthContext);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "comment") {
      setComment(value);
    }
  };

  const handleDeleteComment = async (data: CommentProps) => {
    const confirm = window.confirm("해당 댓글을 삭제하시겠습니까?");

    if (confirm && post.id) {
      const postRef = doc(db, "posts", post.id);

      await updateDoc(postRef, {
        comments: arrayRemove(data),
      });
      toast.success("댓글을 삭제했습니다!");

      // 문서업데이트
      getpost(post.id);
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        const postRef = doc(db, "posts", post.id);

        if (user?.uid) {
          const commentObj = {
            content: comment,
            uid: user.uid,
            email: user.email,
            createdAt: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          };

          await updateDoc(postRef, {
            comments: arrayUnion(commentObj),
            updatedDated: new Date().toLocaleDateString("ko", {
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }),
          });
          await getpost(post.id);
        }
      }
      toast.success("댓글을 생성했습니다");
      setComment("");
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <>
      <div className="comments">
        <form onSubmit={onSubmit} className="comments__form">
          <div className="form__block">
            <label htmlFor="comment">댓글입력</label>
            <textarea
              value={comment}
              name="comment"
              id="comment"
              onChange={onChange}
              required
            ></textarea>
          </div>
          <div className="form__block form__block-reverse">
            <input type="submit" value="입력" className="form__btn-submit" />
          </div>
        </form>
        <div className="comments__list">
          {post?.comments
            ?.slice()
            .reverse()
            .map((comment: any) => (
              <div key={comment.uid} className="comment__box">
                <div className="comment__profile-box">
                  <div className="comment__email">{comment?.email}</div>
                  <div className="comment__date">{comment.createdAt}</div>
                  {comment.uid === user?.uid && (
                    <div
                      className="comment__delete"
                      onClick={() => handleDeleteComment(comment)}
                    >
                      삭제
                    </div>
                  )}
                </div>
                <div className="comment__text">{comment.content}</div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
