import colors from "tailwindcss/colors";

/* 
	https://m3.material.io/styles/color/the-color-system/color-roles
*/
export default {
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
    DEFAULT: colors.gray[50],
    light: colors.gray[50],
    dark: colors.gray[900],
  },
  surface: {
    DEFAULT: colors.gray[100],
    light: colors.gray[100],
    dark: colors.gray[800],
  },
  focus: colors.blue[400],
  "surface-container": {
    DEFAULT: colors.gray[200],
    light: colors.gray[200],
    dark: colors.gray[700],
  },
  "modal-backdrop": {
    DEFAULT: "rgba(17, 24, 39, 0.4)",
    light: "rgba(17, 24, 39, 0.4)",
    dark: "rgba(243, 244, 246, 0.05)",
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
  "on-surface-container": {
    DEFAULT: colors.black,
    light: colors.black,
    dark: colors.white,
  },
};
