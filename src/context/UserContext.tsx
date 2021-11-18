import React, {
  ReactChild,
  ReactChildren,
  createContext,
  useContext,
  useEffect,
  useState,
  Dispatch,
  SetStateAction,
} from 'react';
import { getAccessToken } from '../lib/axios';
import { getAuthData } from '../services/auth';

export interface IUser {
  id: number;
  username: string;
}

export const UserContext = createContext<{
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}>({
  user: null,
  setUser: () => { }
});

export const UserProvider = ({ children }: { children: ReactChild | ReactChildren}) => {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    async function start() {
      if (getAccessToken()) {
        const data = await getAuthData()

        if (data) setUser(data)        
      }
    }

    start()
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);

export default useUser;
