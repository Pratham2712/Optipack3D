import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/zoom";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "./StageLoading.css";

import { FreeMode, Navigation, Thumbs, Pagination, Zoom } from "swiper/modules";
import { useLocation, useNavigate } from "react-router-dom";
import { rgbaToHex } from "../../Util/util";

const heading = ["Name", "Length", "Width", "Height", "Filled", "Total"];

const StageLoading = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imgData, setImgData] = useState({});
  const [showSku, setShowSku] = useState([]);
  const [imgColors, setImgColors] = useState([]);
  const location = useLocation();
  const { inputData, filled, boxData } = location.state || {};
  const navigate = useNavigate();

  const replaceHex = (colorCode) => {
    colorCode = colorCode.replace("0x", "#");
    return colorCode;
  };

  const generateData = (imgData) => {
    Object.keys(imgData).forEach((ele) => {
      if (ele > 0) {
        for (let i = 0; i < imgData?.[ele]?.color?.length - 1; i++) {
          console.log(imgData[ele].color[i], ele);
          const currColor = imgData[ele].color[i];

          for (let j = 0; j < parseInt(inputData.numTypes); j++) {
            const colorKey = `color${j}`;

            if (rgbaToHex(inputData[colorKey]) == replaceHex(currColor)) {
              const data = {
                filled: boxData[j],
                totalCases: inputData[`numberOfCases${j}`],
                name: inputData[`sku${j}`],
                length: inputData[`length${j}`],
                width: inputData[`width${j}`],
                height: inputData[`height${j}`],
                rotationAllowed: inputData[`rotationAllowed${j}`],
              };

              setShowSku((prev) => {
                const alreadyExists = prev.some((item) => item[currColor]);
                if (alreadyExists) return prev; // If currColor exists, return current state without adding
                return [...prev, { [currColor]: data }]; // Else, add new entry
              });
            }
          }
        }
      }
    });
  };

  const goBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("boxData")) || {};
    const lastImg = localStorage.getItem("screenshot");
    setImgData(data);
    const color = [];
    color.push(...data?.[Object.keys(data)?.length - 1]?.color);
    color.push(data?.[Object.keys(data)?.length - 1]?.color?.[0]);
    console.log("color", color);

    setImgData((prev) => ({
      ...prev,
      [Object.keys(prev).length]: { screenshot: lastImg, color: color },
    }));
  }, []);

  useEffect(() => {
    if (Object.keys(imgData).length > 0) {
      generateData(imgData);
    }
    setImgColors(imgData?.[1]?.color);
  }, [imgData]);

  return (
    <>
      <h3 style={{ marginLeft: "1rem", marginTop: "3rem" }}>
        Stage wise loading
      </h3>
      <div className="carusel-content">
        <Swiper
          style={{
            "--swiper-navigation-color": "#cc9c87",
            "--swiper-pagination-color": "#cc9c87",
            height: "375px",
          }}
          pagination={{
            type: "progressbar",
          }}
          zoom={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs, Pagination, Zoom]}
          className="mySwiper"
          onSlideChange={(swiper) => {
            setImgColors(imgData[swiper.activeIndex + 1]?.color);
          }}
        >
          {Object.keys(imgData)?.map((ele, index) => {
            if (imgData[ele]?.screenshot) {
              return (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img src={imgData[ele]?.screenshot} />
                  </div>
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper2"
        >
          {Object.keys(imgData)?.map((ele) => {
            if (imgData[ele]?.screenshot) {
              return (
                <SwiperSlide>
                  <img src={imgData[ele]?.screenshot} />
                </SwiperSlide>
              );
            }
          })}
        </Swiper>
      </div>
      <div
        className="sku-details"
        style={{
          display: "flex",
          flexDirection: "column",
          padding: "0.5rem",
          width: "100%",
          justifyContent: "center",
        }}
      >
        <table>
          <tr>
            {heading.map((ele) => {
              return <th style={{ padding: "8px" }}>{ele}</th>;
            })}
          </tr>
          {imgColors?.map((item, index) => {
            if (
              index < imgColors?.length - 1 &&
              index < parseInt(inputData?.["numTypes"])
            ) {
              const sku = showSku.find((obj) => obj[item]);

              return (
                <>
                  <tr>
                    <td style={{ background: replaceHex(item) }}>
                      {sku[item]?.name}
                    </td>
                    <td>{sku[item]?.length}</td>
                    <td>{sku[item]?.width}</td>
                    <td>{sku[item]?.height}</td>
                    <td>{sku[item]?.filled}</td>
                    <td>{sku[item]?.totalCases}</td>
                  </tr>
                </>
              );
            }
          })}
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="btn-apply"
            style={{
              background: "white",
              border: "2px solid #cc9c87",
              color: "black",
              fontSize: "1rem",
              padding: "10px 19px",
            }}
            onClick={goBack}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
};

export default StageLoading;
