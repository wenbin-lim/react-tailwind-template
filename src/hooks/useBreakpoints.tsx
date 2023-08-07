import { useMediaQuery } from "usehooks-ts";
import { useTheme } from "@src/hooks";

const useBreakpoints = (breakpoint: string) => {
  const theme = useTheme();
  const availableBreakpoints = theme.screens;

  // check if breakpoint is available
  if (breakpoint && !availableBreakpoints[breakpoint]) {
    console.error(
      `The breakpoint ${breakpoint} is not available in your tailwind.config.js file.`,
    );
  }

  const query = `(max-width: ${availableBreakpoints[breakpoint]})`;
  return useMediaQuery(query);
};

export default useBreakpoints;
