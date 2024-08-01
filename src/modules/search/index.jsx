import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Card } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import Head from "../../components/Head";
import Meta from "antd/es/card/Meta";

export default function Search() {
  const [movie, setMovie] = useState([]);
  const { query } = useParams();
  const navigate = useNavigate();

  const loadMovie = async () => {
    try {
      await axios
        .get(`${import.meta.env.VITE_REACT_APP_BASE_URL}/search/movie`, {
          params: {
            api_key: import.meta.env.VITE_REACT_APP_TMBD_KEY,
            query: `${query}`,
          },
        })
        .then((res) => {
          setMovie(res.data.results);
        });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadMovie();
  }, [movie]);

  return (
    <>
      <Head query={'All Movies "' + query + '"'} />
      <div className="container mx-auto">
        <div className="ps-2 border-l-4 border-red-500 my-5">
          <h3 className="text-3xl font-medium">Search Result "{query}"</h3>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 15rem)",
            gap: "1.5rem",
            justifyContent: "center",
          }}
        >
          {movie &&
            movie
              .filter(function (e) {
                return e.poster_path !== null;
              })
              .map((res, index) => {
                return (
                  <Card
                    hoverable
                    key={res.id}
                    style={{ borderRadius: 10, width: "auto", height: "auto" }}
                    bodyStyle={{ objectFit: "cover" }}
                    className="cursor-pointer border-none hover:shadow-lg hover:shadow-red-500 transition-shadow duration-300"
                    cover={
                      <img
                        src={
                          import.meta.env.VITE_REACT_APP_IMG_URL +
                          res.poster_path
                        }
                        alt={res.title}
                        style={{ borderRadius: 10 }}
                      />
                    }
                    onClick={() => navigate(`/movie/${res.id}`)}
                  >
                    <Meta title={res.title} />
                  </Card>
                );
              })}
        </div>
      </div>
    </>
  );
}
