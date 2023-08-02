import { useMediaQuery } from "usehooks-ts";

const useDarkMode = () => useMediaQuery("(prefers-color-scheme: dark)");

export default useDarkMode;
