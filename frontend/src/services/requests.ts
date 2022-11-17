import axios, { AxiosError, AxiosResponse } from 'axios';

export const api = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token: string, username: string) => {
  api.defaults.headers.common.Authorization = token;
  localStorage.setItem("user", JSON.stringify({ username, token }));
};

export const loginRequest = async (username: string, password: string): Promise<AxiosResponse | undefined> => {
  try {
    const data = await api.post('/user/login', { username, password });

    return data;
  } catch (err) {
    const error = err as AxiosError;

    if (error?.response) {
      return error?.response;
    }

    console.log(err);
  }
}