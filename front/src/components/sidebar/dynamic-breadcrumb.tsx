"use client";

import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import lngs from "@/i18n/lngs";
export function DynamicBreadcrumb() {
  const pathname = usePathname();

  let pathSegments = pathname.split("/").filter(Boolean);

  if (lngs.includes(pathSegments[0])) {
    pathSegments = pathSegments.slice(1);
  }
  const pathCrumbs = pathSegments.map((segment, index) => {
    const href = "/" + pathSegments.slice(0, index + 1).join("/");
    return { segment, href };
  });

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {pathCrumbs.map((crumb, index) => {
          const isLast = index === pathCrumbs.length - 1;

          return (
            <div key={crumb.href} className='flex items-center'>
              <BreadcrumbItem className={index !== 0 ? "hidden sm:block" : ""}>
                <BreadcrumbPage>{formatSegment(crumb.segment)}</BreadcrumbPage>
              </BreadcrumbItem>
              {!isLast && (
                <BreadcrumbSeparator
                  className={index !== 0 ? "hidden sm:block" : ""}
                />
              )}
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function formatSegment(segment: string) {
  return segment
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
