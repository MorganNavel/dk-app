import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "./Caroussel.css";
import { ReactNode } from "react";

interface ConfigItem {
  className?: string;
  component: ReactNode;
}

interface CarousselProps {
  config: ConfigItem[];
  className?: string;
  freeMode?: boolean;
}

export const ContinuousCaroussel = ({ config, className }: CarousselProps) => {
  return (
    <div className={className}>
      <Swiper
        modules={[Autoplay]}
        slidesPerView={3}
        loop
        spaceBetween={0}
        direction="horizontal"
        allowTouchMove={false}
        freeMode
        speed={9000}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        className="font-Poppins"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
        }}
      >
        {[...config, ...config].map((item, index) => (
          <SwiperSlide key={index} className={`${item.className}`}>
            {item.component}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
