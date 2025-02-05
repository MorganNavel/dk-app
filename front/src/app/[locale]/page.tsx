"use client";
import "@/globals.css";

import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <FirstCaroussel />
      <ELearningComponent />

      <OnlineClassesComponent />

      {/* <StudentsReviews /> */}
    </div>
  );
}
