import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import "./Caroussel.css";
import { ReactNode } from "react";

interface ConfigItem {
  className?: string;
  component: ReactNode;
}

interface CarousselProps {
  config: ConfigItem[];
  className?: string;
  type?: "progressbar" | "fraction" | "custom" | "bullets";
}

export const Caroussel = ({ config, className, type }: CarousselProps) => {
  return (
    <div className={className}>
      <Swiper
        modules={[
          Navigation,
          Pagination,
          Scrollbar,
          A11y,
          Autoplay,
          EffectFade,
        ]}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          type,
          renderProgressbar: (progressbarFillClass) => {
            console.log(progressbarFillClass);
            return '<span class="' + progressbarFillClass + '"></span>';
          },
          renderFraction: (currentClass, totalClass) => {
            return (
              '<span class="' +
              currentClass +
              '"></span>' +
              " of " +
              '<span class="' +
              totalClass +
              '"></span>'
            );
          },
          renderBullet: (index, className) => {
            return '<span class="' + className + '"/>';
          },
        }}
        navigation
        style={
          {
            "--swiper-navigation-size": "25px",
          } as React.CSSProperties
        }
        className='font-Poppins bg-background'
      >
        {config.map((item, index) => (
          <SwiperSlide key={index} className={`mt-12 ${item.className}`}>
            {item.component}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
