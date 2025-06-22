"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/Footer";
import lngs from "@/i18n/lngs";
import { useSidebar } from "@/components/ui/sidebar";

const snapRoutes = ["/about-us", "/", "/landing"];

export function ClientLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const { isMobile } = useSidebar();

  // Supprime le préfixe de langue du pathname
  const cleanedPath = (() => {
    const segments = pathname.split("/").filter(Boolean);
    if (lngs.includes(segments[0])) {
      return "/" + segments.slice(1).join("/");
    }
    return pathname;
  })();

  const shouldSnap = snapRoutes.includes(cleanedPath);
  console.log("Current Path:", cleanedPath);

  const className =
    shouldSnap && !isMobile
      ? "overflow-auto h-screen snap-mandatory snap-y"
      : "overflow-auto h-screen";

  return (
    <main className={className}>
      {children}
      <section className='snap-start snap-always'>
        <Footer />
      </section>
    </main>
  );
}
