"use client";
import { DoubleCircles } from "@/components/DoubleCircles";
import { Caroussel } from "./Caroussel";
import { NewHereComponent } from "./items/NewHere";
import { ReadReviewsComponent } from "./items/ReadReviews";
import { StartKoreanJourneyComponent } from "./items/StartKoreanJourney";

export const FirstCaroussel = () => {
  const config = {
    newHere: {
      className: "flex justify-center items-center h-full",
      component: (
        <NewHereComponent onClick={() => console.log("start questionnaire")} />
      ),
    },
    startKoreanJourney: {
      className: "flex justify-center items-center h-full",
      component: (
        <StartKoreanJourneyComponent
          onClick={() => console.log("learn more")}
        />
      ),
    },
    readReviews: {
      className: "flex justify-center items-center h-full",
      component: <ReadReviewsComponent onClick={() => console.log("read")} />,
    },
  };
  return (
    <Caroussel
      config={config}
      className="h-screen flex flex-col justify-center items-center"
    >
      <DoubleCircles />
    </Caroussel>
  );
};
