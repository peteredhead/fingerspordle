import { createContext, useState } from "react";

interface AlertContextProps {
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const AlertContext = createContext<AlertContextProps>({
  message: undefined,
  setMessage: () => {},
});

interface AlertProviderProps {
  children: React.ReactNode;
}

function AlertProvider({ children }: AlertProviderProps) {
  const [message, setMessage] = useState<string>();

  const contextValue = {
    message,
    setMessage,
  };

  return (
    <AlertContext.Provider value={contextValue}>
      {children}
    </AlertContext.Provider>
  );
}

export default AlertProvider;
