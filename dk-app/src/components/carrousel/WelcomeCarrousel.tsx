// Caroussel.js
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import { SizeWithHeaderComponent } from "./items/SizeWithHeaderComponent";
import "swiper/css";
import "swiper/css/navigation";
import "./Caroussel.css";
import "swiper/css/scrollbar";
import { NewHereComponent } from "./items/NewHere";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";
import { ReadReviewsComponent } from "./items/ReadReviews";

export const Caroussel = () => {
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 7000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          renderBullet: (index, className) => {
            console.log(className);
            return '<span class="' + className + '">' + "</span>";
          },
        }}
      >
        <SwiperSlide>
          <SizeWithHeaderComponent>
            <NewHereComponent
              onClick={() => console.log("start questionnaire")}
            />
          </SizeWithHeaderComponent>
        </SwiperSlide>
        <SwiperSlide>
          <SizeWithHeaderComponent>
            <StartKoreanJourneyComponent
              onClick={() => console.log("Join Now")}
            />
          </SizeWithHeaderComponent>
        </SwiperSlide>
        <SwiperSlide>
          <SizeWithHeaderComponent>
            <ReadReviewsComponent onClick={() => console.log("Read Reviews")} />
          </SizeWithHeaderComponent>
        </SwiperSlide>
      </Swiper>
      <div className="relative hidden lg:flex">
        <div className="absolute bottom-0 left-0 w-[325px] h-[325px] rounded-tr-full bg-primary opacity-65 border-t-[1px] border-r-[1px]"></div>
        <div className="absolute bottom-0 right-0 w-[325px] h-[325px] rounded-tl-full bg-primary opacity-65 border-t-[1px] border-r-[1px]"></div>
      </div>
    </div>
  );
};
