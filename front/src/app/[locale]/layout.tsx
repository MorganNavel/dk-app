import "@/globals.css";

import { ProfileProvider } from "@/components/context/useProfile";
import { Header } from "@/components/header/Header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Footer } from "@/components/Footer";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

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
    <html lang={locale}>
      <body>
        <ProfileProvider>
          <NextIntlClientProvider messages={messages}>
            <ResizablePanelGroup direction='vertical'>
              <Header />
              <ResizableHandle />
              {children}
              <Footer />
            </ResizablePanelGroup>
          </NextIntlClientProvider>
        </ProfileProvider>
      </body>
    </html>
  );
}
