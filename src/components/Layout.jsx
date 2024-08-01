import React from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div>
      <div className="absolute z-10 w-full">
        <Header />
      </div>
      <section className="mb-3">
        <div className="">{children}</div>
      </section>
      <Footer />
    </div>
  );
}
