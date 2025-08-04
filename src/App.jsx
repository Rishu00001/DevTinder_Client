import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Body from "./components/Body";
import Login from "./components/Login";
import Profile from "./components/Profile";
import { Provider } from "react-redux";
import store from "./redux/store";
import Feed from "./components/Feed";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Connections from "./components/Connections";
import Requests from "./components/Requests";
import Signup from "./components/Signup";
import Premium from "./components/Premium";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div>
      <Provider store={store}>
        <BrowserRouter basename="/">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Body />
                </div>
              }
            >
              <Route
                path="/"
                element={
                  <div>
                    <Feed />
                  </div>
                }
              />
              <Route
                path="/login"
                element={
                  <div>
                    <Login />
                  </div>
                }
              />
              <Route
                path="/signup"
                element={
                  <div>
                    <Signup />
                  </div>
                }
              />
              <Route
                path="/Profile"
                element={
                  <div>
                    <Profile />
                  </div>
                }
              />
              <Route
                path="/connections"
                element={
                  <div>
                    <Connections />
                  </div>
                }
              />
              <Route
                path="/chat/:receiverId"
                element={
                  <div>
                    <ChatWindow />
                  </div>
                }
              />
              <Route
                path="/requests"
                element={
                  <div>
                    <Requests />
                  </div>
                }
              />
              <Route
                path="/premium"
                element={
                  <div>
                    <Premium />
                  </div>
                }
              />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default App;
