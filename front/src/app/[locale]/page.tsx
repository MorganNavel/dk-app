import "@/globals.css";
import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default async function Home() {
  return (
    <>

      <FirstCaroussel />
      <ELearningComponent />
      <div className="my-13"/>

      <OnlineClassesComponent />
      <div className="my-13"/>

      <StudentsReviews />
      <div className="my-13"/>

    </>
  );
}
