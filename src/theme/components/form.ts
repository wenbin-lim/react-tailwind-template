import plugin from "tailwindcss/plugin";

export default plugin(function ({ addComponents, theme }) {
  addComponents({
    ".form-label": {
      display: "block",
      fontSize: theme("fontSize.sm"),
      fontWeight: theme("fontWeight.medium"),
      lineHeight: theme("lineHeight.6"),
      color: "inherit",
      "&.form-label-invalid": {
        color: theme("colors.red.500"),
      },
      "&.form-label-required": {
        "&::after": {
          content: "'*'",
          color: theme("colors.red.500"),
        },
      },
    },
    ".input": {
      display: "block",
      width: "100%",
      border: "none",
      backgroundColor: "inherit",
      color: "inherit",
      borderRadius: theme("borderRadius.DEFAULT"),
      padding: `${theme("padding[1.5]")} ${theme("padding[2.5]")}`,
      fontSize: theme("fontSize.sm"),
      lineHeight: theme("lineHeight.6"),
      "--tw-ring-inset": "inset",
      "--tw-ring-color": theme("colors.gray.300"),
      boxShadow:
        "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
      "&:focus": {
        "--tw-ring-color": theme("colors.focus"),
      },
      "&:disabled": {
        cursor: "not-allowed",
      },
      "&::placeholder": {
        color: theme("colors.gray.400"),
      },
      "&.input-invalid": {
        "--tw-ring-color": theme("colors.red.500"),
        color: theme("colors.red.500"),
        "&:focus": {
          "--tw-ring-color": theme("colors.red.500"),
          boxShadow:
            "var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
        },
        "&::placeholder": {
          color: theme("colors.red.300"),
        },
      },
    },
    ".input-dark": {
      "--tw-ring-color": theme("colors.gray.600"),
      "&::placeholder": {
        color: theme("colors.gray.500"),
      },
      "&.input-invalid": {
        "&::placeholder": {
          color: theme("colors.red.900"),
        },
      },
    },
  });
});
