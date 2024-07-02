"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";

import "./Caroussel.css";
import { NewHereComponent } from "./items/NewHere";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";
import { ReadReviewsComponent } from "./items/ReadReviews";
import { DoubleCircles } from "@/components/DoubleCircles";

export const Caroussel = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
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
            console.log(className);
            return '<span class="' + className + '">' + "</span>";
          },
        }}
        className="w-full h-full font-Poppins"
      >
        <SwiperSlide className="flex justify-center items-center h-full">
          <NewHereComponent
            onClick={() => console.log("start questionnaire")}
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center h-full">
          <StartKoreanJourneyComponent
            onClick={() => console.log("Join Now")}
          />
        </SwiperSlide>
        <SwiperSlide className="flex justify-center items-center h-full">
          <ReadReviewsComponent onClick={() => console.log("Read Reviews")} />
        </SwiperSlide>
      </Swiper>
      <DoubleCircles />
    </div>
  );
};
