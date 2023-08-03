/* 
	Get tailwind theme object
*/
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@tailwind-config";
import { useMemo } from "react";

const useTheme = () => useMemo(() => resolveConfig(tailwindConfig).theme, []);

export default useTheme;
