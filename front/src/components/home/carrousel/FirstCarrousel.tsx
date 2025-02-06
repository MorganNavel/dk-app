"use client";
import { Caroussel } from "@/components/carrousel/Caroussel";
import { NewHereComponent } from "./items/NewHere";
import { ReadReviewsComponent } from "./items/ReadReviews";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";

export const FirstCaroussel = () => {
  const config = [
    {
      component: (
        <NewHereComponent onClick={() => console.log("start questionnaire")} />
      ),
    },
    {
      component: (
        <StartKoreanJourneyComponent
          onClick={() => console.log("learn more")}
        />
      ),
    },
    {
      component: <ReadReviewsComponent onClick={() => console.log("read")} />,
    },
  ];

  return <Caroussel config={config} type="bullets" className=" w-full" />;
};
