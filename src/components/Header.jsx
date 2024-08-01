import "../App";
import React, { useState, useEffect } from "react";
import { Input } from "antd";
import Logo from "../assets/logo.svg";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const { Search } = Input;

  const onSearch = (query) => {
    navigate(`/search/${query}`);
  };

  return (
    <div className="container mx-auto pt-5">
      <div className="flex justify-between">
        <div style={{ width: "25%" }}>
          <img
            src={Logo}
            alt="logo"
            onClick={() => navigate(`/`)}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div className="search" style={{ width: "50%" }}>
          <Search
            placeholder="What do you want to watch?"
            onSearch={onSearch}
            style={{
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    </div>
  );
}
