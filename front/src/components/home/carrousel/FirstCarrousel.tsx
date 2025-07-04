"use client";
import { Caroussel } from "@/components/carrousel/Caroussel";
import { NewHereComponent } from "./items/NewHere";
import { ReadReviewsComponent } from "./items/ReadReviews";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";

export const FirstCaroussel = () => {
  const config = [
    {
      component: <StartKoreanJourneyComponent />,
    },
    {
      component: <NewHereComponent />,
    },
    {
      component: <ReadReviewsComponent />,
    },
  ];

  return <Caroussel config={config} className='w-full' />;
};
