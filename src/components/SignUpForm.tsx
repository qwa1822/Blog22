import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {} from "react";

import { app } from "../firebaseapp";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";
import {
  setEmail,
  setPassword,
  setPasswordConfirm,
  setValideError,
} from "../redux/UserSignupSlice";
export default function SignUpForm() {
  const navigate = useNavigate();
  const { email, password, error } = useSelector((state: any) => state.signUp);

  const dispatch = useDispatch();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const auth = getAuth(app);
      await createUserWithEmailAndPassword(auth, email, password);

      toast.success("회원가입에 성공했습니다!!");
      navigate("/");
    } catch (error) {
      console.log(error);

      toast.error("Error not found invalid User!");
    }
  };

  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === "email") {
      var re =
        /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;
      dispatch(setEmail(value));

      if (!re.test(value)) {
        dispatch(
          setValideError({
            field: "email",
            message: "이메일이 맞지 않습니다!",
          })
        );
      } else {
        dispatch(setValideError({ field: "email", message: "" }));
      }
    }

    if (name === "password") {
      dispatch(setPassword(value));

      if (value.length < 8) {
        dispatch(
          setValideError({ field: "password", message: "8자리 미만입니다" })
        );
      } else {
        dispatch(setValideError({ field: "password", message: "" }));
      }
    }

    if (name === "password__confirm") {
      dispatch(setPasswordConfirm(value));

      if (password && value !== password) {
        dispatch(
          setValideError({
            field: "passwordConfirm",
            message: "비밀번호가 서로 맞지않습니다",
          })
        );
      } else {
        dispatch(
          setValideError({
            field: "passwordConfirm",
            message: "",
          })
        );
      }
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="form form--lg">
        <h1 className="form__title">회원가입</h1>
        <div className="form__block">
          <label htmlFor="email">이메일</label>
          <input
            onChange={onValueChange}
            type="text"
            name="email"
            id="email"
            required
          />
          <div className="form__block">
            <div className="form__error">{error.email}</div>
          </div>
        </div>
        <div className="form__block">
          <label htmlFor="password">비밀번호</label>
          <input
            onChange={onValueChange}
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div className="form__block">
          <div className="form__error">{error.password}</div>
        </div>
        <div className="form__block">
          <label htmlFor="password__confirm">비밀번호확인</label>
          <input
            onChange={onValueChange}
            type="password"
            name="password__confirm"
            id="password__confirm"
            required
          />
        </div>
        <div className="form__block">
          <div className="form__error">{error.passwordConfirm}</div>
        </div>
        <div className="form__block signup_text">
          <div>계정이 이미 있으신가요?</div>
          <Link to="/login  " className="form__link">
            {" "}
            <span>로그인하기</span>
          </Link>
        </div>
        <div className="form__block">
          <input type="submit" value="회원가입" className="form__submit" />
        </div>
      </form>
    </>
  );
}
