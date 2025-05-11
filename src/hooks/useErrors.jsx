import { useContext } from "react";
import ErrorContext from "@/context/ErrorContext";

const useErrors = () => {
  return useContext(ErrorContext);
};

export default useErrors;
