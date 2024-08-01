import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { Card, Empty } from "antd";
// import Credit from './Credit';
// import Navbar from './Nav';
// import ButtonTrailer from '../component/ButtonTrailer';
import { StarOutlined } from "@ant-design/icons";
import YouTube from "react-youtube";
import Credit from "./widgets/Credit";

export default function Movie() {
  const [detail, setDetail] = useState([]);
  const [genre, setGenre] = useState([]);
  const [rating, setRating] = useState(null);
  const { id } = useParams();

  const loadDetail = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/movie/${id}`, {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
          },
        })
        .then((res) => {
          setDetail(res.data);
          setGenre(res.data.genres);
          setRating(res.data.vote_average.toFixed(1));
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadDetail();
  }, [detail]);

  const opts = {
    height: "530",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const optsMobile = {
    height: "300",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const onReady = (event) => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo();
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          height: "100vh",
          width: "auto",
          color: "#fff",
          textAlign: "left",
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: "6rem",
          paddingRight: "30%",
          backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)), url(https://image.tmdb.org/t/p/original${detail.backdrop_path})`,
          backgroundSize: "cover",
        }}
      >
        <div className="flex">
          <div className="me-6">
            <Card
              hoverable
              style={{
                width: 240,
              }}
              bodyStyle={{ padding: 0 }}
              cover={
                <img
                  alt="example"
                  src={
                    import.meta.env.VITE_REACT_APP_IMG_URL + detail.poster_path
                  }
                  style={{ borderRadius: 10 }}
                />
              }
            />
          </div>
          <div>
            <h1 style={{ fontWeight: "bold", color: "#fff" }}>
              {detail.title}
            </h1>
            <div style={{ display: "flex" }}>
              {genre.map((res, index) => {
                return <p className="text-red-500">{res.name}&emsp;</p>;
              })}
            </div>
            <p>{detail.overview}</p>
            <h5
              style={{
                display: "flex",
                alignItems: "center",
                fontWeight: "bold",
                color: "#fff",
                marginBottom: "1rem",
              }}
            >
              <StarOutlined
                style={{ color: "yellow", marginRight: "0.5rem" }}
              />
              {rating} / 10{" "}
            </h5>
          </div>
          {/* <ButtonTrailer title={detail.title} /> */}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container ">
          <div className="ps-2 border-l-4 border-red-500 my-5">
            <h3 className="text-3xl font-medium">Trailer</h3>
          </div>
          {detail.video !== false ? (
            <>
              <div className="hidden lg:block mx-auto h-fit w-full mt-16">
                <YouTube videoId={detail.video} opts={opts} onReady={onReady} />
              </div>
              <div className="lg:hidden mx-auto h-fit w-full mt-16">
                <YouTube
                  videoId={detail.video}
                  opts={optsMobile}
                  onReady={onReady}
                />
              </div>
            </>
          ) : (
            <>
              <Empty description={false} />
              <h3 className="text-xl text-center text-gray">
                Trailer Not Found
              </h3>
            </>
          )}
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container ">
          <div className="ps-2 border-l-4 border-red-500 my-5">
            <h3 className="text-3xl font-medium">Cast and Crew Info</h3>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="container">
          <Credit id={id} />
        </div>
      </div>
    </>
  );
}
