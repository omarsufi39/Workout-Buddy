import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuthContext = function () {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be inside an AuthContextProvider");
  }

  return context;
};
