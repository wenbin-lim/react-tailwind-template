/** @type {import('tailwindcss').Config} */
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

// custom colors
import colors from "./src/theme/colors";

// custom components
import { button, textInput } from "./src/theme/components";

// custom layout sizes
import { layoutSizes, zIndex } from "./src/theme/utils";

export default {
  // darkMode: "class",   // to toggle dark mode via class
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [typography, forms, button, textInput],
  theme: {
    extend: {
      colors,
      spacing: {
        ...layoutSizes,
      },
      zIndex: {
        ...zIndex,
      },
    },
  },
};
