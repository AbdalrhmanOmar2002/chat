import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/Auth";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ChatsContextProvider } from "./context/ChatContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AuthContextProvider>
      <ChatsContextProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ChatsContextProvider>
    </AuthContextProvider>
  </Provider>
);
