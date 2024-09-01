import type { Config } from "tailwindcss";
import { PluginAPI } from "tailwindcss/types/config";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        text: "rgba(7,9,15)",
        primary: "rgb(199, 242, 132)",
        lily: "rgb(232, 249, 255)",
        background: "rgb(24, 34, 45)",
        "light-background": "rgb(48 66 86)",
        dark: "rgb(19,27,36)",
        page: {
          background: "rgb(28, 41, 54)",
        },
      },
    },
  },
  plugins: [
    function ({ addBase }: PluginAPI) {
      addBase({
        'input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button':
          {
            "-webkit-appearance": "none",
            margin: "0",
          },
        'input[type="number"]': {
          "-moz-appearance": "textfield",
        },
      });
    },
  ],
};
export default config;
