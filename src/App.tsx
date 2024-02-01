import { useContext, useEffect, useState } from "react";
import Router from "./router/router";
import { app } from "./firebaseapp";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Loader from "./components/Loader";
import ThemeContext from "./redux/TemaContext";
function App() {
  const auth = getAuth(app);

  const themeCon = useContext(ThemeContext);
  // auth를 체크하기 전에 (initialize)에는 loader를 띄워주는 용도
  const [init, setInit] = useState<boolean>(false);

  console.log(themeCon);

  // auth currentUser가 있으면 authenticated로 변경
  const [user, setuserLogin] = useState<boolean>(!!auth?.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setuserLogin(true);
        // ...
      } else {
        setuserLogin(false);
      }
      setInit(true);
    });
  }, [user]);

  return (
    <div className={themeCon.theme === "light" ? "white" : "dark"}>
      {init ? <Router isAuthenticated={user} /> : <Loader />}
      <ToastContainer />
    </div>
  );
}

export default App;
