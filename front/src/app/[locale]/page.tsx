import "@/globals.css";

import { FirstCaroussel } from "@/components/home/carrousel/FirstCarrousel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { StudentsReviews } from "@/components/home/StudentsReviews";

export default function Home() {
  return (
    <>
      <section className='w-full min-h-screen flex items-center justify-center snap-start snap-always'>
        <FirstCaroussel />
      </section>
      <section className='w-full min-h-screen flex items-center justify-center snap-start snap-always'>
        <ELearningComponent />
      </section>
      <section className='w-full min-h-screen flex items-center justify-center snap-start snap-always'>
        <OnlineClassesComponent />
      </section>
      <section className='w-full min-h-screen flex items-center justify-center snap-start snap-always'>
        <StudentsReviews />
      </section>
    </>
  );
}
