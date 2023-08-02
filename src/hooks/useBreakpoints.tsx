import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@tailwind-config";
import { useMediaQuery } from "usehooks-ts";

const twConfig = resolveConfig(tailwindConfig);
const availableBreakpoints = twConfig.theme.screens;

const useBreakpoints = (breakpoint: string) => {
  // check if breakpoint is available
  if (breakpoint && !availableBreakpoints[breakpoint]) {
    console.error(
      `The breakpoint ${breakpoint} is not available in your tailwind.config.js file.`,
    );
  }

  let query = `(max-width: ${availableBreakpoints[breakpoint]})`;
  return useMediaQuery(query);
};

export default useBreakpoints;
