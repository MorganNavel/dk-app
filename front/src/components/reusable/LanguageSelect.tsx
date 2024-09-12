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

const getLngDisplay = (lng: string) => {
  switch (lng) {
    case "fr":
      return (
        <>
          <span>Français</span>
          <Image src={frFlag} alt={lng} width={20} height={20} />
        </>
      );
    case "en":
      return (
        <>
          <span>English</span>
          <Image src={enFlag} alt={lng} width={20} height={20} />
        </>
      );
    case "ko":
      return (
        <>
          <span>한국</span>
          <Image src={koFlag} alt={lng} width={20} height={20} />
        </>
      );
    default:
      return frFlag;
  }
};
export const LanguageSelect = () => {
  const t = useTranslations();
  const router = useRouter();
  const pathname = usePathname();
  const currentLang = pathname.split("/")[1];

  return (
    <Select
      onValueChange={(lng) => {
        router.replace(`/${lng}${pathname.substring(3)}`);
      }}
    >
      <SelectTrigger className="bg-white border border-gray-300 rounded-md">
        <SelectValue
          placeholder={
            <div className="flex items-center space-x-2">
              {getLngDisplay(currentLang)}
            </div>
          }
        />
      </SelectTrigger>

      <SelectContent className="bg-white border border-gray-300 rounded-md">
        <SelectGroup>
          <SelectItem value="fr" className="hover:bg-primary">
            <div className="flex items-center space-x-2">
              <span>Français</span>
              <Image src={frFlag} alt="French" width={20} height={20} />
            </div>
          </SelectItem>

          <SelectItem value="en">
            <div className="flex items-center space-x-2">
              <span>English</span>
              <Image src={enFlag} alt="English" width={20} height={20} />
            </div>
          </SelectItem>

          <SelectItem value="ko">
            <div className="flex items-center space-x-2">
              <span>한국</span>
              <Image src={koFlag} alt="Korean" width={20} height={20} />
            </div>
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
