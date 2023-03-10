import { useContext } from "react";
import Register from "./pages/Register";
import "./style.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./context/Auth";
import { useDispatch } from "react-redux";
import { chatsActin } from "./store/auth";
import { ChatsContext } from "./context/ChatContext";

function App() {
  const { currentUser } = useContext(AuthContext);
  const dispatch = useDispatch();
  // dispatch(chatsActin.user(currentUser))

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
