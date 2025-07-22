import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { server_url } from "../utils/constants";
import { setUserData } from "../redux/userSlice";
import { addFeed } from "../redux/feedSlice";
import dp from "../assets/dp.webp";
import axios from "axios";
function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let user = useSelector((store) => store.user.userData);
  const handleLogout = async () => {
    try {
      await axios.post(
        `${server_url}/api/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(null));
      dispatch(addFeed(null));
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar bg-base-300">
      <div className="flex-1">
        <Link className="btn btn-ghost text-xl" to={user ? "/" : "/login"}>
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-2">
          <div className="dropdown dropdown-end mx-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src={user?.photo || dp}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to={"/profile"} className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>

              <li>
                <Link to={"/connections"}>Connections</Link>
              </li>
              <li>
                <Link to={"/requests"}>Requests</Link>
              </li>
              <li onClick={handleLogout}>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Navbar;
