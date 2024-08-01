import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Carousel } from "antd";
import { ButtonTrailer } from "../../../components/Button";

export default function Hero() {
  const [trend, setTrend] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const loadTrend = async () => {
    setisLoading(true);
    try {
      axios
        .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/movie/popular`, {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
          },
        })
        .then((res) => {
          let data = res.data.results;
          if (data.length >= 3) {
            data.splice(3);
            setTrend(data);
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    loadTrend();
  }, []);

  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    <div>
      <Carousel autoplay>
        {trend &&
          trend.map((res, index) => {
            return (
              <div key={index}>
                <div
                  style={{
                    display: "flex",
                    height: "100vh",
                    color: "#fff",
                    textAlign: "left",
                    paddingLeft: "6rem",
                    paddingRight: "50%",
                    alignItems: "center",
                    backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original${res.backdrop_path})`,
                    backgroundSize: "cover",
                  }}
                >
                  <div>
                    <h1 style={{ fontWeight: 700, color: "#fff" }}>
                      {res.title}
                    </h1>
                    <p>{res.overview}</p>
                    {/* <ButtonTrailer title={res.title} /> */}
                    <ButtonTrailer click={handleClick} title={res.title} />
                  </div>
                </div>
              </div>
            );
          })}
      </Carousel>
    </div>
  );
}
