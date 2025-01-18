import "@/globals.css";

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
    <ReactQueryProvider>
      <NextIntlClientProvider messages={messages}>
        <ResizablePanelGroup direction='vertical'>
          <Header />
          <ResizableHandle />
          {props.children}
          <Footer />
          <Toaster richColors />
        </ResizablePanelGroup>
      </NextIntlClientProvider>
    </ReactQueryProvider>
  );
}
