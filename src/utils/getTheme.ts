/* 
	Get tailwind theme object
*/
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "@tailwind-config";
import { useMemo } from "react";

const getTheme = () => useMemo(() => resolveConfig(tailwindConfig), []);

export default getTheme;
