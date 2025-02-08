import { usePathname } from "next/navigation";
import ReCAPTCHA from "react-google-recaptcha";

interface ReCAPTCHAProps {
  onChange: (token: string | null) => void;
}
export function Captcha({ onChange }: Readonly<ReCAPTCHAProps>) {
  const path = usePathname();
  const lng = path.split("/")[1];
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={onChange}
      lang={lng}
    />
  );
}
