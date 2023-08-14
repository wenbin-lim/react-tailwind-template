/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";
import typography from "@tailwindcss/typography";
import forms from "@tailwindcss/forms";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  plugins: [typography, forms],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#e45d56",
          light: "#e45d56",
          dark: "#e45d56",
          100: "#fadfdd",
          200: "#f4bebb",
          300: "#ef9e9a",
          400: "#e97d78",
          500: "#e45d56",
          600: "#b64a45",
          700: "#893834",
          800: "#5b2522",
          900: "#2e1311",
        },
        secondary: {
          DEFAULT: "#44C8F5",
          light: "#44C8F5",
          dark: "#44C8F5",
          50: "#F2FBFE",
          100: "#DFF6FD",
          200: "#B8EAFB",
          300: "#91DFF9",
          400: "#6BD3F7",
          500: "#44C8F5",
          600: "#0FB8F2",
          700: "#0A91BF",
          800: "#076889",
          900: "#044054",
          950: "#032C39",
        },
        background: {
          DEFAULT: colors.neutral[50],
          light: colors.neutral[50],
          dark: colors.gray[950],
        },
        surface: {
          DEFAULT: colors.white,
          light: colors.white,
          dark: colors.gray[900],
        },
        "on-primary": {
          DEFAULT: colors.white,
          light: colors.white,
          dark: colors.white,
        },
        "on-secondary": {
          DEFAULT: colors.black,
          light: colors.black,
          dark: colors.black,
        },
        "on-background": {
          DEFAULT: colors.black,
          light: colors.black,
          dark: colors.white,
        },
        "on-surface": {
          DEFAULT: colors.black,
          light: colors.black,
          dark: colors.white,
        },
        "input-focus": colors.blue[400],
      },
      spacing: {
        topbar: "4rem",
        sidebar: "18rem",
        bottombar: "4rem",
      },
      borderRadius: {
        btn: ".25rem",
        input: ".25rem",
      },
      fontSize: {
        xs: ["0.6rem", "1rem"],
      },
      zIndex: {
        // https://mui.com/material-ui/customization/z-index/
        fab: "1000",
        appbar: "1100", // topbar, bottombar, sidebar
        drawer: "1200",
        modal: "1300",
        toast: "1400",
        tooltip: "1500",
      },
    },
  },
};
