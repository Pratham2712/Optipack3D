import React from "react";
import { useNavigate } from "react-router-dom";
import { User_root } from "../../constants/links";

const NoneUser = () => {
  const navigate = useNavigate();
  return (
    <div style={{ margin: "0 auto", width: "fit-content", marginTop: "10rem" }}>
      <div style={{ fontSize: "24px" }}>
        Contact your company administrator to activate access and start using
        the application.
      </div>
      <div style={{ margin: "3rem auto", width: "fit-content" }}>
        <button
          className="btn-apply"
          style={{
            background: "#cc9c87",
            fontSize: "17px",
            padding: "15px 30px",
          }}
          onClick={() => navigate(User_root)}
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default NoneUser;
