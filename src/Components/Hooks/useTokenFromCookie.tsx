import { useContext } from "react";
import { AuthContext } from "../../Global/AuthContext";

const useTokenFromCookie = () => {
  return useContext(AuthContext);
};

export default useTokenFromCookie;