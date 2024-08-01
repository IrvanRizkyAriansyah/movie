import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";

// import required modules
import { FreeMode } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import { formatDate } from "../../../utils/utils";

export default function Swipers(children) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="pb-2"
      ></Swiper>
    </>
  );
}
