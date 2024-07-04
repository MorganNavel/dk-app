"use client";
import Header from "@/components/header/Header"
import { Caroussel } from "@/components/home/carrousel/FirstCaroussel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <Caroussel />
        </div>

        <ELearningComponent
          onClick={() => {
            console.log("learn more");
          }}
        />
        <OnlineClassesComponent onClick={() => console.log("learn more")} />
      </div>
    </>
  );
}
