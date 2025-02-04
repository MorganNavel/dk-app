"use client";
import { useTranslations } from "next-intl";
import { Comment } from "@/components/reusable/Comment";
import { ContinuousCaroussel } from "../carrousel/ContinuousCaroussel";


const comments = [
  <Comment
          fullname="Iris"
          comment="Danbee est une très bonne professeure. Elle est gentille et le fait qu'elle parle français aide beaucoup pour progresser et comprendre le cours. Elle explique les choses très clairement et prend le temps de répondre aux questions. Je vous la recommande fortement !"
          rating={5}
        />,
  <Comment
          fullname="Théo"
          comment="Tres bon professeur, explique de maniere simple et clair les mots / phrases qui sont nouveau pour moi, et me permet de m'entrainer a discuter dans des contexte interessant !! Merci !!"
          rating={5}/>,
  <Comment
          fullname="Benjamin"
          comment="I'm at the beginning of my learning and I needed someone to give me a good base! Very good teacher who takes the time to correct pronunciation and explain, I always have a good time."
          rating={5}
        />,
        <Comment
          fullname="Abdul"
          comment="The teacher is highly accurate and creative in teaching the Korean language so amazing tutor"
          rating={5}
        />,
  <Comment
          fullname="Vivien"
          comment="Danbee is the best korean tutor I had ! She is very skillfull and pacient. I like to study korean with her :)"
          rating={5}/>,
  <Comment
          fullname="Éloi"
          comment="She is really helpfull and really fun. She is really pushing you to try your best. At every start of our meeting, we do some flascards to see if I studied well, and after that, we start some new lecon. It's really well pace!"
          rating={5}
        />,
        <Comment
        fullname="Paulina"
        comment="Amazing teacher, well prepared, kind and patient. The lesson was fun and engaging."
        rating={5}
      />,
  <Comment
        fullname="Léa"
        comment="Danbee est vraiment très gentille, et les cours avec elle sont très intéressants. Elle s'adapte parfaitement aux besoins de ses élèves et j'ai beaucoup appris depuis que je prends des cours avec elle ☺️"
        rating={5}
      />,
        
]

export const StudentsReviews = () => {
  const t = useTranslations();
 const config  = comments.map((comment) => ({
  component: comment,
  className: "mb-12 m-12"
}));
  return (
    <>

      <ContinuousCaroussel config={config} className=" h-full" />
    </>
  );
};
