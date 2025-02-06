"use client";
import { Comment } from "@/components/reusable/Comment";
import { ContinuousCaroussel } from "../carrousel/ContinuousCaroussel";

const comments = [
  {
    fullname: "Iris",
    comment:
      "Danbee est une très bonne professeure. Elle est gentille et le fait qu'elle parle français aide beaucoup pour progresser et comprendre le cours. Elle explique les choses très clairement et prend le temps de répondre aux questions. Je vous la recommande fortement !",
    rating: 5,
  },
  {
    fullname: "Théo",
    comment:
      "Très bon professeur, explique de manière simple et claire les mots / phrases qui sont nouveaux pour moi, et me permet de m'entraîner à discuter dans des contextes intéressants !! Merci !!",
    rating: 5,
  },
  {
    fullname: "Benjamin",
    comment:
      "I'm at the beginning of my learning and I needed someone to give me a good base! Very good teacher who takes the time to correct pronunciation and explain, I always have a good time.",
    rating: 5,
  },
  {
    fullname: "Abdul",
    comment:
      "The teacher is highly accurate and creative in teaching the Korean language, so amazing tutor.",
    rating: 5,
  },
  {
    fullname: "Vivien",
    comment:
      "Danbee is the best Korean tutor I had! She is very skillful and patient. I like to study Korean with her :)",
    rating: 5,
  },
  {
    fullname: "Éloi",
    comment:
      "She is really helpful and really fun. She is really pushing you to try your best. At every start of our meeting, we do some flashcards to see if I studied well, and after that, we start some new lessons. It's really well-paced!",
    rating: 5,
  },
  {
    fullname: "Paulina",
    comment:
      "Amazing teacher, well prepared, kind and patient. The lesson was fun and engaging.",
    rating: 5,
  },
  {
    fullname: "Léa",
    comment:
      "Danbee est vraiment très gentille, et les cours avec elle sont très intéressants. Elle s'adapte parfaitement aux besoins de ses élèves et j'ai beaucoup appris depuis que je prends des cours avec elle ☺️",
    rating: 5,
  },
];

export const StudentsReviews = () => {
  const config = comments.map((comment, index) => ({
    key: `comment-${index}`,
    component: <Comment {...comment} />,
    className: "mx-12",
  }));

  return (
    <ContinuousCaroussel
      config={config}
      className="w-full max-w-screen mx-auto overflow-hidden"
    />
  );
};
