"use client";
import { DoubleCircles } from "@/components/DoubleCircles";
import { Caroussel } from "./Caroussel";
import { NewHereComponent } from "./items/NewHere";
import { ReadReviewsComponent } from "./items/ReadReviews";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";

export const FirstCaroussel = () => {
  const config = {
    newHere: {
      component: (
        <NewHereComponent onClick={() => console.log("start questionnaire")} />
      ),
    },
    startKoreanJourney: {
      component: (
        <StartKoreanJourneyComponent
          onClick={() => console.log("learn more")}
        />
      ),
    },
    readReviews: {
      component: <ReadReviewsComponent onClick={() => console.log("read")} />,
    },
  };
  return (
    <Caroussel
      config={config}
      className="h-[88vh] flex flex-col justify-center items-center"
    >
      <DoubleCircles />
    </Caroussel>
  );
};
