import { useTranslations } from "next-intl";
import {  FaInstagram, FaYoutube } from "react-icons/fa";
import { IoLogoDiscord } from "react-icons/io5";

export const Footer = () => {
    const t = useTranslations("footer");
    const links = [
        {
            href: "",
            text: t("contactUs")
        },
        {
            href: "",
            text: t("home")
        },
        {
            href: "",
            text: t("aboutUs")
        },
        {
            href: "",
            text: t("privacy")
        },
        {
            href: "",
            text: t("terms")
        },
        {
            href: "",
            text:  t("cookies")
        }
    ]
    return (
        <>
        <div className="bg-primary text-textColor">
            <div className="flex flex-col items-center mt-13">
                <div className="flex space-x-9 lg:space-x-64 ">
                    <div className="flex flex-col space-y-1">
                        <p className="font-semibold text-lg ">
                            {t("services")}
                        </p>
                        <a href="" className="hover:underline">
                            {t("videos")}
                        </a>
                        <a href="" className="hover:underline">
                            {t("classes")}
                        </a>
                        <a href="" className="hover:underline">
                            {t("pricing")}
                        </a>
                    </div>
                    <div className="flex flex-col space-y-1">
                        <p className="font-semibold text-lg">
                            {t("ressources")}
                        </p>
                        <a href="" className="hover:underline">
                            {t("dkTeam")}
                        </a>
                        <a href="" className="hover:underline">
                            {t("newsletter")}
                        </a>
                        <a href="" className="hover:underline">
                            {t("faq")}
                        </a>
                    </div>
                </div>
                <p className="mt-7 font-semibold text-center text-sm lg:text-md">
                    {
                        links.map((link, index) => {   
                            return (
                                <>
                                    <span className="lg:inline m-3">
                                        <a 
                                            href={link.href}
                                            className="hover:underline"
                                        >
                                            {link.text}
                                        </a>
                                        </span>
                                        {index !== links.length - 1 && <span className="">|</span>}
                                </>
                            )}
                            
                        )
                    }
                </p>
                <div className="flex mt-7 space-x-6">
                    <div className="flex flex-col items-center space-y-1">
                        <FaInstagram className="text-4xl" />
                        <a className="text-sm" href="">
                            Instagram
                        </a>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <FaYoutube className="text-4xl" />
                        <a className="text-sm" href="">
                            Youtube
                        </a>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                        <IoLogoDiscord className="text-4xl" />
                        <a className="text-sm" href="">
                            Discord
                        </a>
                    </div>

                </div>
                <div className="flex text-sm mt-5 mb-5">
                    <p>
                        © 2024 Danbee Korean. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
        </>
    )
}