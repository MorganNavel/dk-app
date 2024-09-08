import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/select";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import frFlag from "@public/assets/img/fr.svg";
import enFlag from "@public/assets/img/en.svg";
import koFlag from "@public/assets/img/ko.svg";

export const LanguageSelect = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];
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
        router.replace(`/${lng}${pathname.substring(3)}`);
      }}
    >
      <SelectTrigger className='bg-white border border-gray-300 rounded-md'>
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
