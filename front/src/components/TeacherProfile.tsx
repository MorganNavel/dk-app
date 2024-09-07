"use client";
import { Card, CardContent, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ParkDanbeeAvatar from "@public/assets/img/park-danbee-avatar.jpg";

const teacher = {
  name: "Danbee Park",

  skills: [
    "Certificat pédagogique de langue coréenne",
    "Préparation aux examens de langue coréenne (TOPIK)",
    "Cours particuliers",
    "Adaptation des cours aux besoins de l'élève",
    "Capacité à enseigner à différents niveaux de langue",
    "Attentive et à l'écoute des besoins de l'élève",
    "Langue: &#127472 &#127479 &#127467 &#127479 &#127482 &#127480 ",
  ],
  videoUrl: "https://youtu.be/_bElur05Tlk",
  instagram:
    "https://www.instagram.com/danbee_korean?igsh=MXhhYTF6Mm43bTMwaA==",
  preply:
    "https://preply.com/ko/tutor/4335957?fbclid=PAZXh0bgNhZW0CMTEAAaYhRBvCMGNAW_l-YfWZLQw2_Khd9sIibqvVO45MW7xJ5F82AXc11kT2v78_aem_LWQIPl6oU-KeLmnf7DCj4Q",
};

export const TeacherProfile = () => {
  const t = useTranslations();

  return (
    <div className="max-w-4xl mx-auto my-12 font-Poppins">
      <Card className="bg-card text-card-foreground p-6 rounded-lg text-center mb-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent>
          <CardTitle className="text-xl font-semibold mb-4">
            Discover More About Korean Culture and Language
          </CardTitle>
          <p className="text-md mb-6 ">
            Dive into the rich and diverse world of Korean culture and language.
            Join me on Instagram for updates and insights.
          </p>
          <Button variant="round-outline">
            <Link
              href={teacher.instagram}
              className="flex items-center justify-center"
            >
              Follow me on Instagram
            </Link>
          </Button>
        </CardContent>
      </Card>
      <section className="font-Poppins">
        <div className="flex flex-col lg:flex-row items-center lg:space-x-8">
          <Image
            src={ParkDanbeeAvatar}
            alt={`${teacher.name}'s photo`}
            className=" rounded-full h-32 w-32"
          />
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center space-x-5">
              <h1 className="text-3xl font-bold mb-2">{teacher.name}</h1>
            </div>

            <p className="text-md text-balance text-center lg:text-left">
              Tuteur qui parle couramment le français, l'anglais. Du Hangul à la
              maîtrise totale : ensemble, conquérons le coréen !
            </p>
          </div>
        </div>
        <div className="mt-5 text-justify">
          <div>
            <p className="text-lg text-green-950 mb-4">
              Je me présente, je suis Danbee Park et j'étudie la langue coréenne
              pour devenir professeur de coréen en France. Je suis née en Corée
              du Sud et j'ai grandi là-bas. Je suis actuellement à Montpellier,
              en France, car je suis également passionnée par ce pays. Mes
              passe-temps sont les langues étrangères et la musculation 🏋🏻‍♀️. Je
              peux donner des cours en coréen, en français, et en anglais. J'ai
              hâte de vous rencontrer et de vous aider à apprendre le coréen.
            </p>
            <p className="text-lg text-green-950 mb-4">
              Je suis actuellement en train d'étudier afin d'obtenir un
              certificat de professeur de langue coréenne. Je gère mes cours de
              manière personnalisée en analysant les besoins de chacun pour
              offrir les meilleures conditions d'apprentissage. Mes cours
              utilisent des manuels scolaires ainsi que des ressources que je
              crée moi-même. Tous les niveaux sont les bienvenus, du débutant à
              l'avancé.
            </p>
            <p className="text-lg text-green-950 mb-4">
              Je dirigerai un cours de personnalisation en fonction de la
              situation et des attentes de l'élève. Je vais essayer de rendre
              amusant pour les étudiants d'apprendre le coréen en utilisant
              diverses méthodes.
            </p>
          </div>
        </div>
      </section>

      <div className="my-8">
        <Card>
          <CardContent>
            <CardTitle className="p-3 text-2xl font-bold">
              Mes compétences & qualifications
            </CardTitle>
            <ul className="list-disc list-inside space-y-2">
              {teacher.skills.map((skill, index) => (
                <li key={index} className="text-gray-800">
                  {skill}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className="my-8">
        <h2 className="text-2xl font-semibold mb-4">
          Ma vidéo de présentation
        </h2>
        <div className="aspect-w-16 aspect-h-9">
          <iframe
            src={teacher.videoUrl}
            title="Introduction Video"
            // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full rounded-lg"
          ></iframe>
        </div>
      </div>

      <Card className="bg-card text-card-foreground p-6 rounded-lg text-center mb-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
        <CardContent>
          <CardTitle className="text-xl font-semibold mb-4">
            Want to learn Korean with me?
          </CardTitle>
          <p className="text-md mb-6 ">
            Join me on Preply for personalized Korean lessons tailored to your
            needs.
          </p>
          <Button variant="round-outline">
            <Link
              href={teacher.preply}
              className="flex items-center justify-center"
            >
              Join me on Preply Now 🚀 !
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
