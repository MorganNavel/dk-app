import "@/globals.css";

import favicon from "@public/favicon.ico";

export async function generateMetadata() {
  return {
    title: "Danbee Korean - Not Found",
    icons: {
      icon: favicon.src,
    },
  };
}
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export default async function LocaleLayout(props: Readonly<LocaleLayoutProps>) {
  return (
    <html lang={props.params.locale}>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
      </head>

      <body>{props.children}</body>
    </html>
  );
}
