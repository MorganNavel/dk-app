import "@/globals.css";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

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
  if (!routing.locales.includes(props.params.locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
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
  );
}
