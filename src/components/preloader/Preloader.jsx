import React, { useEffect } from "react";

const Preloader = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const preloader = document.querySelector(".preloader");
        preloader.style.display = "none";
      }, 500);
    }
  }, []);

  return (
    <>
      <div className="preloader">
        <div className="loading">
          <div className="bar bar1"></div>
          <div className="bar bar2"></div>
          <div className="bar bar3"></div>
          <div className="bar bar4"></div>
          <div className="bar bar5"></div>
          <div className="bar bar6"></div>
          <div className="bar bar7"></div>
          <div className="bar bar8"></div>
        </div>
      </div>
    </>
  );
};

export default Preloader;
