import { useContext } from "react";
import { AlertContext } from "../providers/AlertProvider";

const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert hook must be used within AlertProvider");
  }
  return context;
};

export default useAlert;
