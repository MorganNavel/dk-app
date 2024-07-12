"use client";
import Header from "@/components/header/Header";
import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <FirstCaroussel />
        </div>
        <ELearningComponent
          onClick={() => {
            console.log("learn more");
          }}
        />
        <OnlineClassesComponent onClick={() => console.log("learn more")} />
        <StudentsReviews />
      </div>
    </>
  );
}
