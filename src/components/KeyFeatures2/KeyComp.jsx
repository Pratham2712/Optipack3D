import React from "react";
import img from "../../assests/second.webp";

const KeyComp = ({ mainText, subText, number, numText, index, image }) => {
  console.log(mainText);

  return (
    <div className="container">
      <div className="text">
        <div className="main_text">
          <p>0{index}</p>
          <div>{mainText}</div>
          <div>{subText}</div>
          <div>Know more</div>
        </div>
        <div className="num_text">
          <div>{number}</div>
          <div>{numText}</div>
        </div>
      </div>
      <div className="image">
        <img src={img} alt="image" />
      </div>
    </div>
  );
};

export default KeyComp;
