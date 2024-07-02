import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      spacing: {
        "13": "3.25rem",
        "15": "3.75rem",
        "128": "32rem",
        "144": "36rem",
      },
      colors: {
        primary: "#57A773",
        background: "#F2F2F2",
        hoverMobile: "#489763",
        menuDesktop: "#99D68F",
        hoverDesktop: "#8FB98E",
        divider: "#DCDCDC",
        overlay: "#232222",
        textColor: "white",
        textColorSecondary: "green-950",
      },
      fontFamily: {
        Roboto: ["Roboto", "sans-serif"],
        Inter: ["Inter", "sans-serif"],
        Poppins: ["Poppins", "sans-serif"],
      },
      fontSize: {
        "10xl": "10rem",
        "11xl": "12rem",
        "12xl": "14rem",
        "13xl": "16rem",
        "14xl": "18rem",
        "15xl": "20rem",
      },
    },
  },
  plugins: [],
};
export default config;
