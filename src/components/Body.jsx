import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import { server_url } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";
import axios from "axios";
function Body() {
  const location = useLocation();
  const user = useSelector((store) => store.user.userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const fetchusers = async () => {
    try {
      const res = await axios.get(`${server_url}/api/profile/view`, {
        withCredentials: true,
      });
      dispatch(setUserData(res?.data));
    } catch (error) {
      if (error?.response?.status === 401 && location.pathname !== "/signup") {
        navigate("/login");
      }
      console.log(error);
    }
  };
  useEffect(() => {
    if (!user) fetchusers();
  }, [user]);
  return (
    <div className="h-[100dvh] w-[100vw] flex flex-col  items-center">
      <Navbar />
      <Outlet />
    </div>
  );
}

export default Body;
