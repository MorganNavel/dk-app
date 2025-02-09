// import { notFound } from "next/navigation";
// import { getRequestConfig } from "next-intl/server";

// const locales = ["en", "fr", "ko"];
// const defaultLocale = "en";

// export default getRequestConfig(async ({ requestLocale }) => {
//   let locale = await requestLocale;

//   if (!locale || !locales.includes(locale as any)) {
//     locale = defaultLocale;
//   }

//   try {
//     return {
//       locale,
//       messages: (await import(`../messages/${locale}.json`)).default,
//     };
//   } catch (error) {
//     console.error(
//       `❌ Erreur de chargement des messages pour la locale '${locale}'`,
//       error
//     );
//     notFound();
//   }
// });
