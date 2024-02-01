import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebaseapp";
import AuthContext from "../redux/UserAuth";
import { toast } from "react-toastify";

export type CategoryType = "Frontend" | "Backend" | "Web" | "Native";
export const CATEGORIES: CategoryType[] = [
  "Frontend",
  "Backend",
  "Web",
  "Native",
];

interface PostListProps {
  hasNavigation?: boolean;
  defaultTab?: TabType;
}

type TabType = "all" | "my";

interface NavigationItemProps {
  label: string;

  tab: TabType;
  isActive: boolean;

  onClick: () => void;
}

export interface CommentProps {
  email: string;
  createdAt: string;
  uid: string;
  content: string;
}
export interface UserProps {
  title: string;
  content: string;
  createdAt: string;
  summary: string;
  comments?: CommentProps[];
  id?: string;
  email: string;
  updatedAt?: string;
  uid?: string;
  category?: CategoryType;
}

const NavigationItem: React.FC<NavigationItemProps> = ({
  label,

  isActive,
  onClick,
}) => (
  <div
    role="presentation"
    onClick={onClick}
    className={isActive ? "post__navigation--active" : "post__navigation"}
  >
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    {label}
  </div>
);
export default function PostList({
  hasNavigation = true,
  defaultTab = "all",
}: PostListProps) {
  const [activeTab, setActiveTab] = useState<TabType | CategoryType>(
    defaultTab
  );
  const [userData, setUserData] = useState<UserProps[]>([]);

  const { user } = useContext(AuthContext);

  const handleDelete = async (id: any) => {
    const confirm = window.confirm("해당 게시글을 삭제하시겠습니까?");

    if (confirm && id) {
      await deleteDoc(doc(db, "posts", id));
      toast.success("삭제 성공했습니다!");

      DataFetchingRequest();
    }
  };

  const handleTabClick = (tab: TabType | CategoryType) => {
    setActiveTab(tab as TabType);
  };

  const DataFetchingRequest = async () => {
    setUserData([]);

    let postQuery;
    if (activeTab === "my") {
      // 나의글만 필터링
      postQuery = query(
        collection(db, "posts"),
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      );
    } else if (activeTab === "all") {
      // 모든글 보여주기
      postQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    } else {
      postQuery = query(
        collection(db, "posts"),
        where("category", "==", activeTab),
        orderBy("createdAt", "desc")
      );
    }

    const data = await getDocs(postQuery);

    data.forEach(post => {
      let dataObj = { ...post.data(), id: post.id };
      setUserData(prev => [...prev, dataObj as UserProps]);
    });
  };

  useEffect(() => {
    DataFetchingRequest();
  }, [activeTab]);

  const tabs: { label: string; tab: TabType | CategoryType }[] = [
    {
      label: "전체",
      tab: "all",
    },
    {
      label: "나의 글",
      tab: "my",
    },
    ...CATEGORIES.map(category => ({
      label: category,
      tab: category,
    })),
  ];

  return (
    <>
      {hasNavigation && (
        <div className="post__wrap">
          <div className="post__navigation">
            {tabs.map(({ label, tab }) => (
              <NavigationItem
                key={tab}
                label={label}
                tab={tab as TabType}
                isActive={activeTab === tab}
                onClick={() => handleTabClick(tab)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="post__list">
        {userData.length > 0 ? (
          userData.map(val => (
            <>
              <div key={val.id} className="post__box">
                <Link to={`/posts/${val.id}`}>
                  <div className="post__profile-box">
                    <div className="post__profile" />
                    <div className="post__author-name">{val.summary}</div>
                    <div className="post__date">{val.createdAt}</div>
                  </div>
                  <div className="post__title">{val?.title}</div>
                  <div className="post__text">{val.summary}</div>
                </Link>
                {user?.email === val.email && (
                  <div className="post__utils-box utils-detail">
                    <div
                      className="post__delete"
                      role="presentation"
                      onClick={() => handleDelete(val.id)}
                    >
                      삭제
                    </div>
                    <div className="post__edit">
                      <Link to={`posts/edit/${val.id}`}>수정</Link>
                    </div>
                  </div>
                )}
              </div>
            </>
          ))
        ) : (
          <div className="post__nopost">없는데이터 입니다</div>
        )}
      </div>
    </>
  );
}
