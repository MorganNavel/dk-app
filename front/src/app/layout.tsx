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

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
