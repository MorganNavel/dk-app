import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select"; // Les composants du `shadcn/ui`
import { useTranslations } from "next-intl"; // Utilisation pour les traductions
import { usePathname, useRouter } from "next/navigation"; // Navigation Next.js
import Image from "next/image"; // Utilisation de `next/image` pour les drapeaux
import frFlag from "@public/assets/img/fr.svg"; // Drapeaux
import enFlag from "@public/assets/img/en.svg";
import koFlag from "@public/assets/img/ko.svg";
import { get } from "http";

export const LanguageSelect = () => {
  const t = useTranslations(); // Hook pour traductions
  const router = useRouter(); // Hook pour la navigation
  const pathname = usePathname(); // Obtenir l'URL actuelle
  const currentLang = pathname.split("/")[1]; // Récupérer la langue actuelle depuis l'URL
  const getIcon = (lang: string) => {
    switch (lang) {
      case "fr":
        return frFlag;
      case "en":
        return enFlag;
      case "ko":
        return koFlag;
      default:
        return frFlag;
    }
  };

  return (
    <Select
      onValueChange={(lng) => {
        router.replace(`/${lng}${pathname.substring(3)}`); // Remplacer la langue dans l'URL et rediriger
      }}
    >
      <SelectTrigger className='bg-white border border-gray-300 rounded-md'>
        {/* Valeur actuelle de la langue avec drapeau */}
        <SelectValue
          placeholder={
            <div className='flex items-center space-x-2'>
              <span>{t(`generals.${currentLang}`)}</span>
              <Image
                src={getIcon(currentLang)}
                alt={currentLang}
                width={20}
                height={20}
              />
            </div>
          }
        />
      </SelectTrigger>

      <SelectContent className='bg-white border border-gray-300 rounded-md'>
        <SelectGroup>
          <SelectItem value='fr' className='hover:bg-primary'>
            <div className='flex items-center space-x-2'>
              <span>{t("generals.fr")}</span>
              <Image src={frFlag} alt='French' width={20} height={20} />
            </div>
          </SelectItem>

          <SelectItem value='en'>
            <div className='flex items-center space-x-2'>
              <span>{t("generals.en")}</span>
              <Image src={enFlag} alt='English' width={20} height={20} />
            </div>
          </SelectItem>

          <SelectItem value='ko'>
            <div className='flex items-center space-x-2'>
              <span>{t("generals.ko")}</span>
              <Image src={koFlag} alt='Korean' width={20} height={20} />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
