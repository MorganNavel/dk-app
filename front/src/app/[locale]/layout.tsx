import "@/globals.css";

import { ProfileProvider } from "@/components/context/useProfile";
import { Header } from "@/components/header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/Footer";
import {
  ResizableHandle,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import favicon from "@public/favicon.ico";
import { ReactQueryProvider } from "@/providers/ReactQueryProvider";
import { Toaster } from "sonner";

export async function generateMetadata({
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

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = await getMessages({ locale });
  } catch (error) {
    console.error(`Failed to load messages for locale ${locale}`, error);
    messages = {};
  }

  return (
    <ReactQueryProvider>
      <ProfileProvider>
        <NextIntlClientProvider messages={messages}>
          <ResizablePanelGroup direction='vertical'>
            <Header />
            <ResizableHandle />
            {children}
            <Footer />
            <Toaster richColors />
          </ResizablePanelGroup>
        </NextIntlClientProvider>
      </ProfileProvider>
    </ReactQueryProvider>
  );
}
