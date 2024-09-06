import "@/globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/header/Header";
import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default async function Home() {
  return (
    <>
      <div className="flex flex-col">
        <div className="flex flex-col h-screen justify-between">
          <Header />
          <FirstCaroussel />
        </div>
        <hr className="hidden lg:flex" />
        <ELearningComponent />
        <hr className="hidden lg:flex" />
        <OnlineClassesComponent />
        <hr className="hidden lg:flex" />
        <StudentsReviews />
        <Footer />
      </div>
    </>
  );
}
