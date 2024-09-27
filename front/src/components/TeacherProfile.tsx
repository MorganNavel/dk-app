"use client";
import { Card, CardContent, CardTitle } from "@ui/card";
import { Button } from "@ui/button";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import ParkDanbeeAvatar from "@public/assets/img/park-danbee-avatar.jpg";

const teacher = {
  name: "Park",
  firstname: "Danbee",

  videoUrl: "https://www.youtube.com/embed/_bElur05Tlk",
  instagram:
    "https://www.instagram.com/danbee_korean?igsh=MXhhYTF6Mm43bTMwaA==",
  preply:
    "https://preply.com/ko/tutor/4335957?fbclid=PAZXh0bgNhZW0CMTEAAaYhRBvCMGNAW_l-YfWZLQw2_Khd9sIibqvVO45MW7xJ5F82AXc11kT2v78_aem_LWQIPl6oU-KeLmnf7DCj4Q",
};

export const TeacherProfile = () => {
  const t = useTranslations();
  const getParagraphs = (key: string, size: number = 3) => {
    let paragraphs = [];
    for (let i = 0; i < size; i++) {
      paragraphs.push(t(`${key}.${i}`));
    }
    return paragraphs;
  };

  return (
    <div className='max-w-xs lg:max-w-4xl mx-auto font-Poppins'>
      <Card className='bg-card text-card-foreground p-6 rounded-lg text-center mb-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
        <CardContent>
          <CardTitle className='text-xl font-semibold mb-4'>
            {t(
              `profile.${
                teacher.firstname + "-" + teacher.name
              }.instagram.title`
            )}
          </CardTitle>
          <p className='text-md mb-6 '>
            {t(
              `profile.${
                teacher.firstname + "-" + teacher.name
              }.instagram.description`
            )}
          </p>
          <Button variant='round-outline'>
            <Link
              href={teacher.instagram}
              className='flex items-center justify-center'
            >
              {t(
                `profile.${
                  teacher.firstname + "-" + teacher.name
                }.instagram.follow`
              )}
            </Link>
          </Button>
        </CardContent>
      </Card>
      <section className='font-Poppins'>
        <div className='flex flex-col lg:flex-row items-center lg:space-x-8'>
          <Image
            src={ParkDanbeeAvatar}
            alt={`${teacher.firstname} ${teacher.name}'s photo`}
            className=' rounded-full h-32 w-32'
          />
          <div className='flex flex-col items-center lg:items-start'>
            <div className='flex items-center space-x-5'>
              <h1 className='text-3xl font-bold mb-2'>{`${teacher.firstname} ${teacher.name}`}</h1>
            </div>

            <p className='text-md text-balance text-center lg:text-left'>
              {t(`profile.${teacher.firstname + "-" + teacher.name}.slogan`)}
            </p>
          </div>
        </div>
        <div className='mt-5 text-justify'>
          <div>
            {getParagraphs(
              `profile.${teacher.firstname + "-" + teacher.name}.paragraphs`,
              3
            ).map((text, index) => (
              <p className='text-lg text-green-950 mb-4' key={index}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className='my-8'>
        <Card>
          <CardContent>
            <CardTitle className='p-3 text-2xl font-bold'>
              {t(
                `profile.${teacher.firstname + "-" + teacher.name}.skills.title`
              )}
            </CardTitle>
            <ul className='list-disc list-inside space-y-2'>
              {[
                "certificate",
                "personalized",
                "adapt",
                "listen",
                "multiLevel",
                "lngs",
              ].map((key, index) => (
                <li key={index} className='text-gray-800'>
                  {t(
                    `profile.${
                      teacher.firstname + "-" + teacher.name
                    }.skills.${key}`
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <div className='my-8'>
        <h2 className='text-2xl font-semibold mb-4'>
          {t(`profile.${teacher.firstname}-${teacher.name}.video`)}
        </h2>
        <div className='relative w-full h-0 pb-[56.25%]'>
          <iframe
            src={teacher.videoUrl}
            title='Introduction Video'
            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
            allowFullScreen
            className='absolute top-0 left-0 w-full h-full rounded-lg'
          ></iframe>
        </div>
      </div>

      <Card className='bg-card text-card-foreground p-6 rounded-lg text-center mb-8 transform transition-transform duration-300 hover:scale-105 hover:shadow-xl'>
        <CardContent>
          <CardTitle className='text-xl font-semibold mb-4'>
            {t(`profile.${teacher.firstname}-${teacher.name}.preply.title`)}
          </CardTitle>
          <p className='text-md mb-6 '>
            {t(
              `profile.${teacher.firstname}-${teacher.name}.preply.description`
            )}
          </p>
          <Button variant='round-outline' className='w-full py-5 '>
            <Link
              href={teacher.preply}
              className='flex items-center justify-center '
            >
              <p className='text-wrap'>
                {t(
                  `profile.${teacher.firstname}-${teacher.name}.preply.buttonText`
                )}
              </p>
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
