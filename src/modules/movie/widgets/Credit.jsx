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

export default function Credit(props) {
  const [cast, setCast] = useState([]);
  const [crew, setCrew] = useState([]);
  const { Meta } = Card;

  const loadCast = async () => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/movie/${
            props.id
          }/credits`,
          {
            params: {
              api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
            },
          }
        )
        .then((res) => {
          setCast(res.data.cast.slice(0, 5));
        });
    } catch (error) {
      console.error(error);
    }
  };

  const loadCrew = async () => {
    try {
      await axios
        .get(
          `${import.meta.env.VITE_REACT_APP_BASE_URL}/movie/${
            props.id
          }/credits`,
          {
            params: {
              api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
            },
          }
        )
        .then((res) => {
          console.log("credit", res.data);
          setCrew(res.data.crew.slice(0, 10));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadCast();
    loadCrew();
  }, [cast, crew]);

  return (
    <>
      <Swiper
        slidesPerView={5}
        spaceBetween={20}
        freeMode={true}
        modules={[FreeMode]}
        className="pb-2"
      >
        {cast &&
          cast
            .filter(function (e) {
              return e.profile_path !== null;
            })
            .map((res, index) => {
              return (
                <SwiperSlide>
                  <Card
                    hoverable
                    key={res.id}
                    style={{
                      borderRadius: 10,
                      width: "auto",
                      height: "auto",
                      margin: "0.5rem",
                    }}
                    bodyStyle={{ padding: "1rem" }}
                    cover={
                      <img
                        src={
                          import.meta.env.VITE_REACT_APP_IMG_URL +
                          res.profile_path
                        }
                        alt={res.name}
                        style={{ borderRadius: 10 }}
                      />
                    }
                  >
                    <Meta title={res.name} description={res.character} />
                  </Card>
                </SwiperSlide>
              );
            })}
        {crew &&
          crew
            .filter(function (e) {
              return e.profile_path !== null;
            })
            .map((res, index) => {
              return (
                <SwiperSlide>
                  <Card
                    hoverable
                    key={res.id}
                    style={{
                      borderRadius: 10,
                      width: "auto",
                      height: "auto",
                      margin: "0.5rem",
                    }}
                    bodyStyle={{ padding: "1rem" }}
                    cover={
                      <img
                        src={
                          import.meta.env.VITE_REACT_APP_IMG_URL +
                          res.profile_path
                        }
                        alt={res.name}
                        style={{ borderRadius: 10 }}
                      />
                    }
                  >
                    <Meta title={res.name} description={res.job} />
                  </Card>
                </SwiperSlide>
              );
            })}
      </Swiper>
    </>
  );
}
