import { useLocale } from "next-intl";
import { useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCAPTCHAProps {
  onChange: (token: string | null) => void;
}
export function Captcha({ onChange }: Readonly<ReCAPTCHAProps>) {
  const locale = useLocale();
  useEffect(() => {
    console.log("Captcha rendered");
    console.log(process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY);
  }, []);
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={onChange}
      lang={locale}
    />
  );
}
