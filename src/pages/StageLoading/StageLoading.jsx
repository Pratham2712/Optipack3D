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

const StageLoading = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [imgData, setImgData] = useState({});
  console.log(imgData);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("boxData")) || {};
    const lastImg = localStorage.getItem("screenshot");
    setImgData(data);
    setImgData((prev) => ({
      ...prev,
      [Object.keys(prev).length]: { screenshot: lastImg },
    }));
  }, []);

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
        >
          {Object.keys(imgData)?.map((ele) => {
            console.log(imgData[ele], "ele", imgData);
            return (
              <SwiperSlide>
                <img src={imgData[ele]?.screenshot} />
              </SwiperSlide>
            );
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
            return (
              <SwiperSlide>
                <img src={imgData[ele]?.screenshot} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default StageLoading;
