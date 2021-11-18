import { AxiosError } from 'axios';
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
): Promise<{
  user: IUser | null,
  token: string,
  message?: string
}> => {
  try {
    const res = await axios.post('/auth/login', {
      username,
      password
    });

    const data = res.data.data as {
      user: IUser,
      token: string
    };
    localStorage.setItem("access_token", data.token);
    return data;
  } catch (err: any) {
    return {
      user: null,
      token: "",
      message: err.response.data.message
    }
  }
}

export const logout = () => {
  localStorage.removeItem("access_token");
}