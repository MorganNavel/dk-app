import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";
import lngs from "./lngs";
export const routing = defineRouting({
  // A list of all locales that are supported
  locales: lngs,

  // Used when no locale matches
  defaultLocale: "en",
  localePrefix: "as-needed",
  localeDetection: true,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
