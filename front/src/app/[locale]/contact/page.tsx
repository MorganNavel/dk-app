import "@/globals.css";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations();
  return (
    <div>
      <h1>{t("generals.notImplemented")}</h1>
    </div>
  );
}
