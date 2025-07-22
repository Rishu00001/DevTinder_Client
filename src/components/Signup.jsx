import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { server_url } from "../utils/constants";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("Ritik");
  const [lastName, setLastName] = useState("Raj");
  const [gender, setGender] = useState("male");
  const [email, setEmail] = useState("ritik@gmail.com");
  const [password, setPassword] = useState("RitikRaj@123");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!firstName || !lastName || !email || !password || !gender) {
      toast.error("Please fill in all fields");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Enter a valid email address");
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${server_url}/api/auth/signup`,
        {
          firstName,
          lastName,
          gender,
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(setUserData(res?.data));
      navigate("/profile");
      toast.success("Successfully Registered", { autoClose: 1500 });
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Unknown error";
      console.log(errorMessage);

      if (errorMessage.includes("already") && errorMessage.includes("exist")) {
        toast.error("User already exists");
      } else if (
        errorMessage.includes(
          "Password must be at least 8 characters long and include lowercase, uppercase, number, and symbol"
        )
      ) {
        toast.error("Create a strong password");
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-[90dvh] items-center w-[100vw] px-4">
      <div className="card bg-transparent w-full max-w-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">Signup</h2>
          <div className="flex flex-col gap-6 pt-6 pb-5">
            <input
              type="text"
              placeholder="First Name"
              className="input input-bordered"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              className="input input-bordered"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <select
              className="select select-bordered w-full z-50"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input
              type="text"
              placeholder="Email"
              className="input input-bordered"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="text-xs text-gray-500 -mt-4">
              Use 8+ characters including uppercase, lowercase, number & symbol
            </p>
          </div>

          <div className="card-actions flex flex-col items-center pt-4">
            <button
              className="btn btn-primary w-full"
              onClick={handleSignup}
              disabled={loading}
            >
              {loading ? "Signing up..." : "Signup"}
            </button>
            <p className="text-sm pt-2 text-center text-gray-400">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
