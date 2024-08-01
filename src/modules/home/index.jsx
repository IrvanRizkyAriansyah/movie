import React from "react";
import Hero from "./widgets/Hero";
import Popular from "./widgets/Popular";

export default function Home() {
  return (
    <div>
      <div>
        <Hero />
      </div>
      <div className="flex justify-center">
        <div className="container ">
          <div className="ps-2 border-l-4 border-red-500 my-5">
            <h3 className="text-3xl font-medium">Popular Movie</h3>
          </div>
          <Popular />
        </div>
      </div>
    </div>
  );
}
