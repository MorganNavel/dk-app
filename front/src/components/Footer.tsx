"use client";
import { useTranslations } from "next-intl";
import { FaInstagram, FaYoutube } from "react-icons/fa";
import logo from "@public/assets/img/logo.png";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations();

  return (
    <footer className='bg-primary w-full text-white lg:pt-32 lg:pb-10 pt-12 pb-4 mt-16'>
      <div className=' mx-auto lg:px-20 px-6 max-w-full'>
        <div className='flex w-full flex-col justify-between gap-10 lg:flex-row lg:items-start lg:text-left text-center'>
          <div className='flex w-full flex-col justify-between gap-6 lg:items-start items-center'>
            <div className='font-semibold flex items-center gap-4 flex-col lg:flex-row'>
              <Image
                src={logo}
                alt='Logo'
                width={775}
                height={518}
                className='w-24 h-auto'
              />
              <p>{t("siteName")}</p>
            </div>
            <p className='text-muted max-w-[70%] text-sm'>
              {t("footer.description")}
            </p>
            <div className='flex gap-6'>
              <SocialIcon
                href='https://www.instagram.com/korean_with_danbee?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=='
                label='Instagram'
              >
                <FaInstagram size={24} />
              </SocialIcon>
              <SocialIcon
                href='https://www.youtube.com/@TuteurDeCoréenDanbee'
                label='YouTube'
              >
                <FaYoutube size={24} />
              </SocialIcon>
            </div>
          </div>

          {/* Sections de liens */}
          <div className='grid w-full gap-6 md:grid-cols-3 lg:gap-20'>
            <FooterSection
              title={t("footer.company")}
              links={[
                { href: "/about-us", text: t("footer.aboutUs") },
                { href: "/contact", text: t("footer.contactUs") },
              ]}
            />
            <FooterSection
              title={t("footer.services")}
              links={[
                { href: "/danbee-park/schedule", text: t("footer.classes") },
                { href: "/pricing", text: t("footer.pricing") },
              ]}
            />
            <FooterSection
              title={t("footer.legal")}
              links={[
                { href: "/privacy", text: t("footer.privacy") },
                { href: "/terms", text: t("footer.terms") },
                { href: "/cookies", text: t("footer.cookies") },
              ]}
            />
          </div>
        </div>

        {/* Socials & Copyright */}
        <div className='mt-8 flex flex-col justify-between gap-4 border-t py-8 text-xs font-medium md:flex-row md:items-center md:text-left text-center'>
          <p className='text-sm text-gray-200'>
            {t("footer.copyRight", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({
  title,
  links,
}: Readonly<{
  title: string;
  links: { href: string; text: string }[];
}>) {
  return (
    <div>
      <p className='font-semibold text-white text-md mb-4'>{title}</p>
      <ul className='space-y-3'>
        {links.map((link, i) => (
          <li key={i}>
            <Link
              href={link.href}
              className='text-gray-300 hover:text-white transition-colors duration-300 text-sm'
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: Readonly<{
  href: string;
  label: string;
  children: React.ReactNode;
}>) {
  return (
    <Link
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={label}
      className='hover:text-gray-600 text-gray-200 transition-colors duration-300'
    >
      {children}
    </Link>
  );
}
