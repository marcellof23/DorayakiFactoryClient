import { IUser } from '../context/UserContext';
import axios from '../lib/axios';

export const getAuthData = async (): Promise<IUser> => {
  const res = await axios.get('/auth')
  const user = res.data.data?.user as IUser;
  return user;
}

export const authLogin = async (
  username: string,
  password: string,
): Promise<string> => {
  const res = await axios.post('/auth/login', {
    username,
    password
  });
  const jwt = res.data.data as string;
  localStorage.setItem("access_token", jwt);
  return jwt;
}