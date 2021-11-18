import {
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
import { getAuthData, logout } from '../services/auth';

export interface IUser {
  id: number;
  username: string;
}

export const UserContext = createContext<{
  user: IUser | null;
  loading: boolean;
  setUser: Dispatch<SetStateAction<IUser | null>>;
}>({
  user: null,
  loading: true,
  setUser: () => { }
});

export const UserProvider = ({ children }: { children: ReactChild | ReactChildren}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function start() {
      if (getAccessToken()) {
        const data = await getAuthData()

        if (data) {
          setUser(data)
        } else {
          setUser(null)
          logout()
        }
      }
      setLoading(false)
    }

    start()
  }, [])

  return (
    <UserContext.Provider value={{ user, loading, setUser }}>
      {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);

export default useUser;
