"use client";
import Header from "@/components/Header";
import { Caroussel } from "@/components/home/carrousel/FirstCaroussel";
import { ELearningComponent } from "@/components/home/ELearningComponent";

export default function Home() {
  return (
    <>
      <Header />
      <Caroussel />
      <ELearningComponent />
    </>
  );
}
