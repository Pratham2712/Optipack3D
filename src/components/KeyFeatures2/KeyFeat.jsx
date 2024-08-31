import React from "react";
import { featuresData } from "../../Util/data";
import KeyComp from "./KeyComp";
import "./KeyFeat.css";
import first from "../../assests/first.webp";
import second from "../../assests/second.webp";
import third from "../../assests/third.webp";

const KeyFeat = () => {
  const image = {
    first: first,
    second: second,
    third: third,
  };
  return (
    <div>
      {featuresData?.map((ele, index) => (
        <KeyComp ele={ele} key={index} index={index + 1} image={image[index]} />
      ))}
    </div>
  );
};

export default KeyFeat;
