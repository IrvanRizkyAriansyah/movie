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

export default function Popular() {
  const [trend, setTrend] = useState([]);
  const navigate = useNavigate();

  const loadTrend = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/movie/popular`, {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
          },
        })
        .then((res) => {
          setTrend(res.data.results);
          console.log(res.data.results);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadTrend();
  }, []);

  return (
    <>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="pb-2"
      >
        {trend &&
          trend.map((res, index) => {
            return (
              <SwiperSlide key={res.id}>
                <Card
                  key={res.id}
                  style={{
                    borderRadius: 10,
                    width: "auto",
                    height: "auto",
                    margin: "0.5rem",
                  }}
                  className="cursor-pointer border-none hover:shadow-lg hover:shadow-red-500 transition-shadow duration-300"
                  cover={
                    <img
                      src={
                        import.meta.env.VITE_REACT_APP_IMG_URL + res.poster_path
                      }
                      alt="poster"
                      style={{ borderRadius: 10 }}
                      onClick={() => navigate(`/movie/${res.id}`)}
                    />
                  }
                >
                  <Meta
                    title={res.title}
                    description={formatDate(res.release_date)}
                  />
                </Card>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
