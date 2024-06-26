import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
} from "react";
import { UserType } from "@/firebase/client";

type AppContextType = {
  user?: UserType;
  title?: string;
  subTitle?: string;
  setAppContext?: (values: Partial<AppContextType>) => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [valueAppContext, setValueAppContext] = useState<AppContextType>({});

  const setAppContext = useCallback((values: Partial<AppContextType>) => {
    setValueAppContext((prevContext) => ({ ...prevContext, ...values }));
  }, []);

  return (
    <AppContext.Provider value={{ ...valueAppContext, setAppContext }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
