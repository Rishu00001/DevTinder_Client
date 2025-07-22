import React, { useEffect, useRef, useState } from "react";
import { IoCameraOutline } from "react-icons/io5";
import dp from "../assets/dp.webp";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { server_url } from "../utils/constants";
import { setUserData } from "../redux/userSlice";

function EditProfile() {
  const userData = useSelector((store) => store.user.userData);
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(userData?.firstName || "");
  const [lastName, setLastName] = useState(userData?.lastName || "");
  const [bio, setBio] = useState(userData?.bio);
  const [email, setEmail] = useState(userData?.email || "");

  const [frontendImage, setFrontendImage] = useState(userData?.image || dp);
  const [backendImage, setBackendImage] = useState(null);
  const [saving, setSaving] = useState(false);

  const savingRef = useRef(false);
  const image = useRef();

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstName || "");
      setLastName(userData.lastName || "");
      setEmail(userData.email || "");
      setFrontendImage(userData.photo || dp);
      setBio(userData?.bio);
    }
  }, [userData]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    e.preventDefault();
    if (savingRef.current) return;

    savingRef.current = true;
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("bio", bio);
      if (backendImage) {
        formData.append("photo", backendImage); // ✅ backend expects "photo"
      }

      const result = await axios.patch(
        `${server_url}/api/profile/edit`,
        formData,
        {
          withCredentials: true,
        }
      );
      console.log(result.data);

      dispatch(setUserData(result.data?.user));
      toast.success("Your profile was updated!", { autoClose: 2000 });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    } finally {
      setTimeout(() => {
        savingRef.current = false;
        setSaving(false);
      }, 2000);
    }
  };

  return (
    <div className="card w-96 shadow-sm h-[90vh] overflow-y-scroll pb-10 scroll-hide">
      <div className="card-body">
        <div
          className="relative w-[100px] h-[100px] hover:scale-105 transition-transform duration-300 cursor-pointer mx-auto"
          onClick={() => image.current.click()}
        >
          <img
            src={frontendImage}
            alt="Profile"
            className="w-full h-full object-cover rounded-full border-[5px] border-white shadow-md"
          />
          <IoCameraOutline className="absolute bottom-2 right-1 bg-white rounded-full p-1 w-6 h-6 text-purple-700 shadow-md" />
        </div>
        <h2 className="card-title justify-center">
          {userData && userData.firstName + " " + userData.lastName}
        </h2>
        <span className="justify-center flex">{userData && userData.bio}</span>
        
        <div className="flex flex-col gap-5 pt-10 pb-5">
          <input
            type="file"
            accept="image/*"
            hidden
            ref={image}
            onChange={handleImage}
          />

          <input
            type="text"
            value={firstName}
            placeholder="first name"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            type="text"
            value={lastName}
            placeholder="last name"
            className="input input-bordered input-info w-full max-w-xs"
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="input input-bordered flex items-center gap-2 w-full max-w-xs mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              disabled
              type="text"
              className="grow"
              placeholder="Email"
              value={email}
            />
          </label>
          <textarea
            value={bio}
            className="textarea textarea-info"
            placeholder="about yourself"
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </div>

        <div className="card-actions justify-center">
          <button
            onClick={handleProfile}
            className="btn btn-primary"
            disabled={saving}
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
