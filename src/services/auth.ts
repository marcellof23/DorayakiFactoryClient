import { IUser } from '../utils/interface';
import axios from '../lib/axios';

export const getAuthData = async (): Promise<IUser | null> => {
  try {
    const res = await axios.get('/auth')
    const user = res.data.data?.user as IUser;
    return user
  } catch (err) {
    return null
  }
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