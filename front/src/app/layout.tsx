
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

export default async function LocaleLayout(
  props: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang='en'>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      </head>

      <body >
        {props.children}
      </body>
    </html>
  );
}
