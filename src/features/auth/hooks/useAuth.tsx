import { useContext } from "react";
import { AuthContext } from "../provider";

const useAuth = () => useContext(AuthContext);

export default useAuth;
