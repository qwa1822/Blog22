import { getAuth, signOut } from "firebase/auth";

import { app } from "../firebaseapp";
import { toast } from "react-toastify";
import AuthContext from "../redux/UserAuth";
import { useContext } from "react";
export default function Profile() {
  const { user } = useContext(AuthContext);

  console.log(user);

  const onSignOut = async () => {
    try {
      const auth = getAuth(app);
      await signOut(auth);
      toast.success("로그아웃 되셨습니다!");
    } catch (error: any) {
      console.log(error);
      toast.error(error?.code);
    }
  };

  return (
    <>
      <div className="profile__box">
        <div className="flex__box-lg">
          <div className="profile__image" />
          <div>
            <div className="profile__email">{user?.email}</div>
            <div className="profile__name">{user?.displayName || "시용자"}</div>
          </div>
        </div>
        <div
          role="presentation"
          onClick={onSignOut}
          className="profile__logout"
        >
          로그아웃
        </div>
      </div>
    </>
  );
}
