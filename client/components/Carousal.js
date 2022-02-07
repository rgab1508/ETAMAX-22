import { Pagination, Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const Carousal = ({ items, breakpoints, allowPagination }) => {
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 3000 }}
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={breakpoints}
      loop={true}
      pagination={{ clickable: allowPagination }}
    >
      {items.map((Component, idx) => {
        return (
          <SwiperSlide
            style={{
              paddingBottom: "30px",
            }}
            key={idx}
          >
            {Component}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
};

export default Carousal;
