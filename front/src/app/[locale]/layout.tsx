import "@/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/Footer";

import favicon from "@public/favicon.ico";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";

import { SidebarProvider } from "@/components/ui/sidebar";
import { SidebarLayout } from "@/components/sidebar/sidebar-layout";
export function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  switch (locale) {
    case "en":
      return {
        title: "Danbee Korean - Learn with Ease",
        icons: {
          icon: favicon.src,
        },
      };
    case "fr":
      return {
        title: "Danbee Korean - Apprenez en Toute Simplicité",
        icons: {
          icon: favicon.src,
        },
      };
    case "ko":
      return {
        title: "Danbee Korean - Learn with Ease",
        icons: {
          icon: favicon.src,
        },
      };
  }
}
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}
export default async function LocaleLayout(props: Readonly<LocaleLayoutProps>) {
  let messages;
  const locale = props.params.locale;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    messages = {};
  }

  return (
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0'
        ></meta>
      </head>

      <body>
        <ReactQueryProvider>
          <NextIntlClientProvider messages={messages}>
            <SidebarProvider>
              <SidebarLayout>
                <main>
                  {props.children}
                  <Footer />
                </main>
              </SidebarLayout>
              <Toaster richColors />
            </SidebarProvider>
          </NextIntlClientProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
