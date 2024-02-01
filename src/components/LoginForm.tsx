import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setPassword, setValideError } from "../redux/UserSignupSlice";
import { toast } from "react-toastify";
import { app } from "../firebaseapp";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export default function LoginForm() {
  const navigate = useNavigate();

  let { email, password, error } = useSelector((state: any) => state.signUp);

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("로그인에 성공했습니다");
      navigate("/");
    } catch (error) {
      console.error("Firebase Authentication 에러:", error);
      toast.error("로그인에 실패했습니다!");
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "email") {
      const validRegex =
        /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

      if (!validRegex.test(value)) {
        dispatch(
          setValideError({ field: "email", message: "이메일이 맞지 않습니다!" })
        );
      } else {
        dispatch(setValideError({ field: "email", message: "" }));
      }
    }
    if (name === "password") {
      dispatch(setPassword(value));

      if (value.length < 8) {
        dispatch(
          setValideError({
            field: "password",
            message: "비밀번호가 8자리 이하입니다",
          })
        );
      } else {
        dispatch(setValideError({ field: "password", message: "" }));
      }
    }
  };

  return (
    <form onSubmit={onSubmit} className="form form--lg">
      <h1 className="form__title">로그인</h1>
      <div className="form__block">
        <label htmlFor="email">이메일</label>
        <input
          onChange={onChange}
          type="text"
          name="email"
          id="email"
          required
        />
      </div>
      <div className="form__block">
        <div className="form__error">{error.email}</div>
      </div>

      <div className="form__block">
        <label htmlFor="password">비밀번호</label>
        <input
          onChange={onChange}
          type="password"
          name="password"
          id="password"
          required
        />
      </div>
      <div className="div__block"></div>

      <div className="form__block">
        <div className="form__error">{error.password}</div>
      </div>

      <div className="form__block signup_text">
        <div>계정이 없으신가요?</div>
        <Link to="/signup" className="form__link">
          {" "}
          <span>회원가입하기</span>
        </Link>
      </div>
      <div className="form__block">
        <input type="submit" value="로그인" className="form__submit" />
      </div>
    </form>
  );
}
