import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import dragStyle from "./Drag.module.css";

const Test = () => {
  useEffect(() => {
    const carousel = document.querySelector(`.${dragStyle.carousel}`);
    const leftBtn = document.getElementById("left");
    const rightBtn = document.getElementById("right");
    const wrapper = document.querySelector(`.${dragStyle.wrapper}`);

    if (!carousel || !wrapper || !leftBtn || !rightBtn) return;

    const firstCard = carousel.querySelector(`.${dragStyle.card}`);
    if (!firstCard) return;
    const firstCardWidth = firstCard.offsetWidth;

    let isDragging = false,
      startX,
      startScrollLeft;

    const dragStart = (e) => {
      isDragging = true;
      carousel.classList.add("dragging");
      startX = e.pageX - carousel.offsetLeft;
      startScrollLeft = carousel.scrollLeft;
    };

    const dragging = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - carousel.offsetLeft;
      const walk = x - startX;
      carousel.scrollLeft = startScrollLeft - walk;
    };

    const dragStop = () => {
      isDragging = false;
      carousel.classList.remove("dragging");
    };

    const scrollLeft = () => {
      carousel.scrollLeft -= firstCardWidth;
    };

    const scrollRight = () => {
      carousel.scrollLeft += firstCardWidth;
    };

    carousel.addEventListener("mousedown", dragStart);
    carousel.addEventListener("mousemove", dragging);
    document.addEventListener("mouseup", dragStop);

    leftBtn.addEventListener("click", scrollLeft);
    rightBtn.addEventListener("click", scrollRight);

    return () => {
      carousel.removeEventListener("mousedown", dragStart);
      carousel.removeEventListener("mousemove", dragging);
      document.removeEventListener("mouseup", dragStop);
      leftBtn.removeEventListener("click", scrollLeft);
      rightBtn.removeEventListener("click", scrollRight);
    };
  }, []);

  return (
    <div className={dragStyle.body1}>
      <div className={dragStyle.wrapper}>
        <i id="left" className="fa-solid fas fa-angle-left"></i>
        <ul className={dragStyle.carousel}>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          <li className={dragStyle.card}>
            <div className={dragStyle.img}>
              <img
                src="https://media.geeksforgeeks.org/wp-content/uploads/20240213150115/ppp.png"
                alt=""
                draggable="false"
              />
            </div>
            <h2 style={{ color: "green", fontWeight: "bold" }}>
              GeeksforGeeks
            </h2>
            <span>Coding Platform</span>
          </li>
          {/* Repeat the card elements as needed */}
        </ul>
        <i id="right" className="fa-solid fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default Test;
