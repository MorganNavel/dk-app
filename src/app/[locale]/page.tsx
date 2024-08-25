"use client";
import "@/globals.css";
import { Footer } from "@/components/footer/Footer";
import { Header } from "@/components/header/Header";
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
        <hr className="hidden lg:flex" />

        <ELearningComponent
          onClick={() => {
            console.log("learn more");
          }}
        />
        <hr className="hidden lg:flex" />
        <OnlineClassesComponent onClick={() => console.log("learn more")} />
        <hr className="hidden lg:flex" />
        <StudentsReviews />
        <Footer />
      </div>
    </>
  );
}
