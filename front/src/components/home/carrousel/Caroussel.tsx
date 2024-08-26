import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "./Caroussel.css";
import { ReactNode } from "react";

type ConfigType = {
  [key: string]: {
    className: string;
    component: ReactNode;
  };
};

interface CarousselProps {
  config: ConfigType;
  children?: ReactNode;
  className?: string;
}

export const Caroussel = ({ config, children, className }: CarousselProps) => {
  return (
    <div className={className}>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        className="w-full h-full font-Poppins"
      >
        {Object.keys(config).map((key, index) => (
          <SwiperSlide key={index} className={config[key].className}>
            {config[key].component}
          </SwiperSlide>
        ))}
        {children}
      </Swiper>
    </div>
  );
};
