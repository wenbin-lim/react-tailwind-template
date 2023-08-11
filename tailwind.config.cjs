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
          DEFAULT: "#30455B",
          light: "#30455B",
          dark: "#30455B",
          50: "#84A1BE",
          100: "#7796B7",
          200: "#5C82A9",
          300: "#4C6E90",
          400: "#3E5976",
          500: "#30455B",
          600: "#1D2936",
          700: "#090D12",
          800: "#000000",
          900: "#000000",
          950: "#000000",
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
          dark: colors.neutral[800],
        },
        surface: {
          DEFAULT: colors.white,
          light: colors.white,
          dark: colors.neutral[900],
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
