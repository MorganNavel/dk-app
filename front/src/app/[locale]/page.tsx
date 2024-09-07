import "@/globals.css";
import { Footer } from "@/components/Footer";
import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default async function Home() {
  return (
    <>
      <FirstCaroussel />
      <hr className="hidden lg:flex" />
      <ELearningComponent />
      <hr className="hidden lg:flex" />
      <OnlineClassesComponent />
      <hr className="hidden lg:flex" />
      <StudentsReviews />
    </>
  );
}
