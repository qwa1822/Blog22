import {
  WithFieldValue,
  addDoc,
  collection,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { db } from "../firebaseapp";
import AuthContext from "../redux/UserAuth";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import { CATEGORIES, CategoryType, UserProps } from "./PostList";

interface postProps {
  title: "";
  content: "";
  summary: "";
  createdAt: "";
}

export default function PostForm() {
  const params = useParams();

  const [post, setPost] = useState<UserProps | null>(null);

  const getPost = async (id: any) => {
    if (id) {
      const data = doc(db, "posts", id);
      const docSnap = await getDoc(data);

      setPost({ id: docSnap.id, ...(docSnap.data() as UserProps) });
    }
  };

  useEffect(() => {
    if (params.id) {
      getPost(params.id);
    }
  }, [params?.id]);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [category, setCategory] = useState<CategoryType>("Frontend");
  const [allMenu, setMenu] = useState<postProps>({
    title: "",
    content: "",
    summary: "",
    createdAt: "",
  });

  useEffect(() => {
    if (post) {
      setMenu((prev: any) => {
        return {
          ...prev,
          title: post?.title || "",
        };
      });
      setMenu((prev: any) => {
        return {
          ...prev,
          content: post?.content || "",
        };
      });
      setMenu((prev: any) => {
        return {
          ...prev,
          summary: post?.summary || "",
        };
      });
      setCategory(post?.category || "Frontend");
    }
  }, [post]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      if (post && post.id) {
        // 만약 post데이터가 있다면firestore로 데이터 수정

        const postRef = doc(db, "posts", post?.id);
        await updateDoc(postRef, {
          title: allMenu.title,
          content: allMenu.content,

          summary: allMenu.summary,
          updatedAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          category: category,
        });
        toast.success("게시글 수정했습니다");
        navigate(`/posts/${post.id}`);
      } else {
        await addDoc(collection(db, "posts"), {
          title: allMenu.title,
          content: allMenu.content,
          summary: allMenu.summary,
          createdAt: new Date().toLocaleDateString("ko", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
          email: user?.email,
          uid: user?.uid,
          category: category,
        } as WithFieldValue<UserProps>);
        toast.success("게시글을 성공적으로 만들었습니다!");
        navigate("/");
      }
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message);
    }
  };

  const onChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "title") {
      setMenu((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (name === "content") {
      setMenu((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (name === "summary") {
      setMenu((prev: any) => {
        return {
          ...prev,
          [name]: value,
        };
      });
    }
    if (name === "category") {
      setCategory(value as CategoryType);
    }
  };
  return (
    <form onSubmit={onSubmit} className="form">
      <div className="form__block">
        <label htmlFor="title">제목</label>
        <input
          value={allMenu.title}
          onChange={onChange}
          type="text"
          name="title"
          id="title"
          required
        />
      </div>
      <div className="form__block">
        <label htmlFor="category">카테고리</label>
        <select
          name="category"
          id="category"
          onChange={onChange}
          defaultValue={category}
        >
          <option value="">카테고리를 선택해주세요</option>
          {CATEGORIES?.map(category => (
            <option value={category} key={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="form__block">
        <label htmlFor="summary">요약</label>
        <input
          value={allMenu.summary}
          type="text"
          onChange={onChange}
          name="summary"
          id="summary"
          required
        />
      </div>

      <div className="form__block">
        <label htmlFor="content">내용</label>
        <textarea
          value={allMenu.content}
          name="content"
          onChange={onChange}
          id="content"
          required
        />
      </div>

      <div className="form__block">
        <input
          type="submit"
          value={post ? "수정" : "제출"}
          className="form__submit"
        />
      </div>
    </form>
  );
}
