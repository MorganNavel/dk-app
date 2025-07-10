"use client";
import { Card, CardContent, CardTitle } from "@ui/card";
import { useTranslations } from "next-intl";
import Image from "next/image";
import ParkDanbeeAvatar from "@public/assets/img/park-danbee-avatar.jpg";
import { Cta } from "@/components/ui/cta";

const teacher = {
  name: "Park",
  firstname: "Danbee",
  videoUrl: "https://www.youtube.com/embed/Uo4ci4cOPtA",
  instagram:
    "https://www.instagram.com/korean_with_danbee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  preply:
    "https://preply.com/ko/tutor/4335957?fbclid=PAZXh0bgNhZW0CMTEAAaYhRBvCMGNAW_l-YfWZLQw2_Khd9sIibqvVO45MW7xJ5F82AXc11kT2v78_aem_LWQIPl6oU-KeLmnf7DCj4Q",
};
export default function TeacherProfile() {
  const t = useTranslations();
  const getParagraphs = (key: string, size: number = 3) => {
    let paragraphs = [];
    for (let i = 0; i < size; i++) {
      paragraphs.push(t(`${key}.${i}`));
    }
    return paragraphs;
  };

  return (
    <div className='flex flex-col max-w-4xl lg:mx-auto px-8 font-Poppins mt-32'>
      <Cta
        title={t(
          `profile.${teacher.firstname}-${teacher.name}.instagram.title`
        )}
        description={t(
          `profile.${teacher.firstname}-${teacher.name}.instagram.description`
        )}
        buttonText={t(
          `profile.${teacher.firstname}-${teacher.name}.instagram.follow`
        )}
        href={teacher.instagram}
      />

      <section className='font-Poppins'>
        <div className='flex flex-col lg:flex-row items-center lg:space-x-8'>
          <Image
            src={ParkDanbeeAvatar}
            alt={`${teacher.firstname} ${teacher.name}'s photo`}
            className='rounded-full h-32 w-32 lg:h-48 lg:w-48'
            width={320}
            height={320}
          />
          <div className='flex flex-col items-center lg:items-start'>
            <div className='flex items-center space-x-5'>
              <h1 className='text-2xl lg:text-4xl font-bold mb-2'>{`${teacher.firstname} ${teacher.name}`}</h1>
            </div>

            <p className='text-md lg:text-lg text-center lg:text-left text-balance'>
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
              <p className='text-lg lg:text-xl text-green-950 mb-4' key={index}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>

      <div className='my-8'>
        <Card>
          <CardContent>
            <CardTitle className='text-2xl lg:text-3xl p-3 font-bold'>
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
                <li key={index} className='text-gray-800 text-md lg:text-lg'>
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
        <h2 className='text-2xl lg:text-3xl font-semibold mb-4'>
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

      <Cta
        title={t(`profile.${teacher.firstname}-${teacher.name}.preply.title`)}
        description={t(
          `profile.${teacher.firstname}-${teacher.name}.preply.description`
        )}
        buttonText={t(
          `profile.${teacher.firstname}-${teacher.name}.preply.buttonText`
        )}
        href={teacher.preply}
      />
    </div>
  );
}
