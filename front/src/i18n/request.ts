import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { notFound } from "next/navigation";

export default getRequestConfig(async ({locale}) => {
  // This typically corresponds to the `[locale]` segment
  if(!routing.locales.includes(locale as any)) return notFound();

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
