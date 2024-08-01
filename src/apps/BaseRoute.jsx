import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import notfound from "../assets/notfound.svg";
import Layout from "../components/Layout";
import Home from "../modules/home";
import Movie from "../modules/movie";
import Search from "../modules/search";

export default function BaseRoute() {
  const location = useLocation();

  const allRoute = [
    { path: "/movie/:id", element: <Movie /> },
    { path: "/search/:query", element: <Search /> },
  ];

  const NotFound = () => {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <img src={notfound} className="w-full h-auto max-w-md" />
      </div>
    );
  };

  useEffect(() => {
    // Scroll ke atas setiap kali lokasi berubah
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <Routes>
      <Route
        index
        element={
          <Layout>
            <Home />
          </Layout>
        }
      />
      {allRoute.map((e) => (
        <Route path={e.path} element={<Layout>{e.element}</Layout>} />
      ))}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
