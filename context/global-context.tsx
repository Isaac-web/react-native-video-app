import { getCurrentUser } from '@/lib/appwrite';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react';

type User = Record<string, string>;

type GlobalContextType = {
  isLoggedIn: boolean;
  isLoading: boolean;
  setIsLoggedIn(value: boolean): void;
  user: User | null;
  setUser(user: User): void;
};

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalProvider = ({ children }: PropsWithChildren) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Record<string, string> | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleGetCurrentUser = async () => {
    try {
      const currentUser = (await getCurrentUser()) as unknown as Record<
        string,
        string
      >;

      setUser(currentUser);
    } catch (err) {
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetCurrentUser();
  }, []);

  return (
    <GlobalContext.Provider
      value={{ isLoggedIn, setIsLoggedIn, user, setUser, isLoading }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
