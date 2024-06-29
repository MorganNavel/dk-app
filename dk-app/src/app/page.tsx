"use client";
import Header from "@/components/Header";
import { Caroussel } from "@/components/home/carrousel/FirstCaroussel";
import { ELearningComponent } from "@/components/home/ELearningComponent";

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <Caroussel />
        </div>

        <ELearningComponent />
      </div>
    </>
  );
}
