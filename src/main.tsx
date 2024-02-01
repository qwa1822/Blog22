import ReactDOM from "react-dom/client";

import "./index.css";
import { BrowserRouter } from "react-router-dom";

import App from "./App.tsx";

import { Provider } from "react-redux";
import { store } from "./store.tsx";
import { AuthContextProvider } from "./redux/UserAuth.tsx";
import { ThemeContextProvider } from "./redux/TemaContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </AuthContextProvider>
  </ThemeContextProvider>
);
