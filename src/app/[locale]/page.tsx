"use client";
import Header from "@/components/header/Header"
import { Caroussel } from "@/components/home/carrousel/FirstCaroussel";
import { ELearningComponent } from "@/components/home/ELearningComponent";
import { OnlineClassesComponent } from "@/components/home/OnlineClassesComponent";
import { Comment } from "@/components/reusable/Comment"
import { renderStars } from "./utils/renderStars";




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
          <div className="h-screen">
            <div className=" hidden lg:flex w-full fex flex-col justify-between">
              <h1 className="text-4xl font-bold text-center text-primary drop-shadow mt-13"> Students&apos; Reviews </h1>
              <div className="flex justify-center mt-8">
                <h2 className="text-2xl font-bold text-center text-primary drop-shadow flex items-center text-primary">
                  <p className="mr-5">Average : </p>
                  <span className="flex text-yellow-500">{renderStars(5)}</span>
                </h2>
              </div>
              
              <div className="flex justify-center mt-13">
                <div className="bg-primary w-[5px]"></div>
                <Comment fullname="Iris" comment="Danbee est une très bonne professeure. Elle est gentille et le fait qu'elle parle français aide beaucoup pour progresser et comprendre le cours. Elle explique les choses très clairement et prend le temps de répondre aux questions. Je vous la recommande fortement !" note={5} />
                <div className="bg-primary w-[5px] "></div>
                <Comment fullname="Théo" comment="Tres bon professeur, explique de maniere simple et clair les mots / phrases qui sont nouveau pour moi, et me permet de m'entrainer a discuter dans des contexte interessant !! Merci !!" note={5} />
                <div className="bg-primary w-[5px] "></div>
                <Comment fullname="Benjamin" comment="I'm at the beginning of my learning and I needed someone to give me a good base! Very good teacher who takes the time to correct pronunciation and explain, I always have a good time." note={5} />
                <div className="bg-primary w-[5px]"></div>
              </div>
            </div>
        </div>
    </div>  
  </>
);
}
