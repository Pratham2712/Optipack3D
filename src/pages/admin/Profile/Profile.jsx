import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb/Breadcrumb";
import Sidebar from "../../../components/Sidebar/Sidebar";
import { useSelector } from "react-redux";
import author from "../../../assests/emptyProfile.png";
import "./Profile.css";
import UploadImagePop from "../../../AdminComponents/UploadImagePop/UploadImagePop";

const Profile = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.rootReducer.authSlice.data.user);

  return (
    <div>
      <Breadcrumb />
      <Sidebar className="hide-sidebar" />
      <div className="profile-content">
        <div className="profile-main">
          <div className="profile-image">
            <img
              src={user?.image_url || author}
              alt="your-image"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="profile-details">
            <div>
              <strong>Email :</strong> {user?.email}
            </div>
            <div>
              <strong>Company :</strong> {user?.company}
            </div>
            <div>
              <strong>Role :</strong> {user?.userType}
            </div>
          </div>
        </div>
        {open && (
          <UploadImagePop
            uploadPop={open}
            setUploadPop={setOpen}
            imageUrl={user?.image_url}
          />
        )}
      </div>
    </div>
  );
};

export default Profile;
