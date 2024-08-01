import React from "react";
import { Button } from "antd";
import { PlayCircleOutlined } from "@ant-design/icons";

const ButtonPrimary = (props) => {
  return (
    <Button
      danger
      type="primary"
      shape="round"
      size={"large"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={props.click}
      htmlType={props.type}
    >
      {" "}
      {props.title}{" "}
    </Button>
  );
};

const ButtonTrailer = (props) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.open(
      `https://www.youtube.com/results?search_query=${encodeURIComponent(
        props.title
      )}`,
      "_blank"
    );
  };

  return (
    <Button
      danger
      type="primary"
      shape="round"
      icon={<PlayCircleOutlined />}
      size={"large"}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      onClick={handleClick}
    >
      {" "}
      WATCH TRAILER{" "}
    </Button>
  );
};

export { ButtonPrimary, ButtonTrailer };
