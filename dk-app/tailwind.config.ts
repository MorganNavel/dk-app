import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#57A773",
        background: "#F2F2F2",
        hoverMobile: "#489763",
        menuDesktop: "#99D68F",
        hoverDesktop: "#8FB98E",
        divider: "#DCDCDC",
        overlay: "#232222",
        textColor: "white"

      },
      fontFamily: {
        Roboto: ['Roboto',"sans-serif"],
        Inter: ['Inter',"sans-serif"],
        Poppins: ['Poppins',"sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
