import React, { useEffect, useState } from "react";
import { Navigation, Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Carousal = ({ items }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      // navigation
      autoplay={{ delay: 3000 }}
      loop={true}
      slidesPerView={1}
      pagination={{ clickable: true }}
    >
      {items.map((Component, idx) => {
        return (
          <SwiperSlide style={{ paddingBottom: "30px" }} key={idx}>
            {Component}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousal;
