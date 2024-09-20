import React from "react";
import img from "../../assests/second.webp";
import final from "../../assests/feat-final.png";

const KeyComp = ({ ele, index, image }) => {
  return (
    <div className="container_feat">
      <div className="text">
        <div className="main_text">
          <p>0{index}</p>
          <h3>{ele?.mainText}</h3>
          <div className="sub_text">{ele?.subText}</div>
          <a>Know more</a>
        </div>
        <div className="num_text">
          <div>{ele?.number}</div>
          <p>{ele?.numText}</p>
        </div>
      </div>
      <div className="image">
        <img src={img} alt="image" />
      </div>
    </div>
  );
};

export default KeyComp;
