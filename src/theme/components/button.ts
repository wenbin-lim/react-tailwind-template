import plugin from "tailwindcss/plugin";

export default plugin(function ({ addComponents, theme }) {
  addComponents({
    ".btn": {
      userSelect: "none",
      borderRadius: theme("borderRadius.DEFAULT"),
      fontWeight: theme("fontWeight.semibold"),
      padding: `${theme("padding[1.5]")} ${theme("padding[2.5]")}`,
      fontSize: theme("fontSize.sm"),
      lineHeight: theme("lineHeight.5"),
      "&:focus": {
        outline: "solid",
        outlineWidth: theme("outlineWidth.2"),
        outlineOffset: theme("outlineOffset.2"),
        outlineColor: theme("colors.focus"),
      },
      "&:hover": {
        opacity: theme("opacity.75"),
      },
      "&:disabled": {
        opacity: theme("opacity.50"),
        cursor: "not-allowed",
      },
      "&.btn-outline": {
        "--tw-ring-inset": "inset",
        boxShadow:
          "var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color)",
      },
      "&.btn-sm": {
        padding: `${theme("padding[1]")} ${theme("padding[2]")}`,
        fontSize: theme("fontSize.xs"),
        lineHeight: theme("lineHeight.4"),
      },
      "&.btn-lg": {
        padding: `${theme("padding[2.5]")} ${theme("padding[3.5]")}`,
        fontSize: theme("fontSize.sm"),
        lineHeight: theme("lineHeight.5"),
      },
    },
  });
});
