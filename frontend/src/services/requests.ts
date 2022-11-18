import axios, { AxiosError } from 'axios';

export const axiosRequest = axios.create({
  baseURL: `http://localhost:${process.env.REACT_APP_API_PORT || '3001'}`,
});

export const setToken = (token: string, username: string) => {
  axiosRequest.defaults.headers.common.Authorization = token;
  localStorage.setItem("user", JSON.stringify({ username, token }));
};

export const loginRequest = async (username: string, password: string) => {
  try {
    const data = await axiosRequest.post('/user/login', { username, password });

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return error;
  }
}

export const registerRequest = async (username: string, password: string) => {
  try {
    const data = await axiosRequest.post('/user/register', { username, password });

    return data;
  } catch (err) {
    const error = err as AxiosError;

    return error;
  }
}

export const validateToken = async (token: string) => {
  try {
    await axiosRequest.post('/user/validate', { token });
  } catch (err) {
    const error = err as AxiosError;

    return error;
  }
}

export const accountRequest = async () => {
  const data = await axiosRequest.get('/account');

  return data;
}

export const transactionsRequest = async () => {
  const data = await axiosRequest.get('/transaction');

  return data;
}