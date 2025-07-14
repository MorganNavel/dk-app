export function tsToLocaleDate(
  ts: number,
  withTime: boolean = false,
  lang: string = "en"
): string {
  const date = new Date(ts);

  // Récupérer la locale du navigateur (uniquement côté client)
  const browserLocale =
    typeof window !== "undefined" && navigator.language
      ? navigator.language.toLowerCase()
      : "";

  let locale = "en-US"; // fallback

  if (lang === "fr") {
    locale = "fr-FR";
  } else if (lang === "ko") {
    locale = "ko-KR";
  } else if (lang === "en") {
    // Choix entre en-US ou en-GB selon navigateur
    if (
      browserLocale.startsWith("en-gb") ||
      browserLocale.startsWith("en-ie") ||
      browserLocale.startsWith("en-au")
    ) {
      locale = "en-GB";
    }
  }

  if (withTime) {
    return date.toLocaleString(locale, {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  }

  return date.toLocaleDateString(locale);
}
