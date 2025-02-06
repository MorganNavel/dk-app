"use client";
import Image from "next/image";
import logo from "@public/assets/img/logo.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Star,
  HeartHandshake,
  BadgeCheck,
  Sparkles,
} from "lucide-react";
import { SlidesIn } from "@/components/animations/SlidesIn";

export default function AboutUs() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-16">
      <SlidesIn side="right" duration={0.6} once>
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-primary">
            Apprenez le coréen avec passion et méthode !
          </h1>
          <p className="mt-4 text-lg text-gray-700 max-w-xl">
            Une approche unique, flexible et efficace pour vous aider à
            maîtriser le coréen à votre rythme.
          </p>
        </div>
        <Card className="lg:flex-1 shadow-lg rounded-lg overflow-hidden hidden ">
          <CardContent>
            <Image
              src={logo}
              alt="Cours de coréen en ligne"
              width={775}
              height={518}
            />
          </CardContent>
        </Card>
      </SlidesIn>

      <SlidesIn side="left" duration={0.6} once>
        <Title>Qui sommes-nous ?</Title>
        <p className="mt-4 text-gray-700">
          Depuis 1 an et demi sur Preply, j&apos;ai accompagné des étudiants de
          tous niveaux grâce à une approche pédagogique personnalisée. Mon
          objectif est de rendre l&apos;apprentissage du coréen interactif,
          amusant, et accessible à tous.
        </p>
      </SlidesIn>

      <SlidesIn side="left" duration={0.6} once>
        <Title>Pourquoi nous choisir ?</Title>
      </SlidesIn>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <SlidesIn side="right" duration={0.6}>
          <Card className="p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary">
            <BadgeCheck className="text-green-500 w-10 h-10 mx-auto mb-3" />
            <CardContent>
              <h3 className="text-xl font-semibold text-center">
                Méthode efficace
              </h3>
              <p className="mt-2 text-gray-600">
                Des cours adaptés à votre rythme et à vos besoins.
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side="right" duration={0.6}>
          <Card className="p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary">
            <Star className="text-yellow-500 w-10 h-10 mx-auto mb-3" />
            <CardContent>
              <h3 className="text-xl font-semibold text-center">
                Flexibilité totale
              </h3>
              <p className="mt-2 text-gray-600">
                Apprenez où et quand vous voulez, sans contraintes.
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side="right" duration={0.6}>
          <Card className="p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary">
            <HeartHandshake className="text-blue-500 w-10 h-10 mx-auto mb-3 " />
            <CardContent>
              <h3 className="text-xl font-semibold text-center">
                Suivi personnalisé
              </h3>
              <p className="mt-2 text-gray-600">
                Un accompagnement dédié pour vous aider à progresser.
              </p>
            </CardContent>
          </Card>
        </SlidesIn>

        <SlidesIn side="right" duration={0.6}>
          <Card className="p-6 shadow-md hover:shadow-xl transition-transform transform duration-500 hover:scale-105 border border-transparent hover:border-primary">
            <Sparkles className="text-purple-500 w-10 h-10 mx-auto mb-3" />
            <CardContent>
              <h3 className="text-xl font-semibold text-center">Expérience</h3>
              <p className="mt-2 text-gray-600">
                Plus de 1000h d&apos;enseignement.
              </p>
            </CardContent>
          </Card>
        </SlidesIn>
      </div>

      <section className="text-center md:text-left animate-fade-in delay-600">
        <SlidesIn side="left" duration={0.6} once>
          <Title>Ce que nous proposons</Title>
        </SlidesIn>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SlidesIn side="right" duration={0.6}>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Cours interactifs pour
              tous les niveaux
            </div>
          </SlidesIn>

          <SlidesIn side="right" duration={0.6}>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Ressources pédagogiques
              exclusives
            </div>
          </SlidesIn>

          <SlidesIn side="right" duration={0.6}>
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Accompagnement
              personnalisé
            </div>
          </SlidesIn>

          <SlidesIn side="right" duration={0.6}>
            <li className="flex items-center gap-2">
              <CheckCircle className="text-green-500" /> Flexibilité et
              autonomie dans l&apos;apprentissage
            </li>
          </SlidesIn>
        </div>
      </section>

      <section className="text-center animate-fade-in delay-700">
        <Card className="w-full mx-auto hover:scale-105 transition-transform duration-300 shadow-lg">
          <CardHeader>
            <h3 className="text-3xl font-bold text-primary">
              Rejoignez-nous dès maintenant !
            </h3>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-gray-700 ">
              Inscrivez-vous aujourd&apos;hui et transformez votre apprentissage
              du coréen en une aventure passionnante.
            </CardDescription>
            <Button variant="round-outline" className="mt-5 text-md">
              <p>Commencer maintenant</p>
              <svg
                className="w-5 h-5 transition-transform transform hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function Title({ children }: { children: React.ReactNode }) {
  return <h2 className="text-3xl font-semibold">{children}</h2>;
}
